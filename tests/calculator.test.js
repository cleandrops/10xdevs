const assert = require( 'node:assert/strict' );
const fs = require( 'node:fs' );
const path = require( 'node:path' );
const test = require( 'node:test' );
const vm = require( 'node:vm' );

const script = fs.readFileSync( path.join( __dirname, '../wordpress/pracownia-wycena/view.js' ), 'utf8' );

function element() {
  const attributes = new Map();
  const listeners = new Map();
  return {
    value: '', textContent: '', hidden: false,
    get href() { return attributes.get( 'href' ) || ''; },
    set href( value ) { attributes.set( 'href', value ); },
    getAttribute( name ) { return attributes.get( name ) || null; },
    setAttribute( name, value ) { attributes.set( name, value ); },
    removeAttribute( name ) { attributes.delete( name ); },
    addEventListener( name, callback ) { listeners.set( name, callback ); },
    dispatch( name ) { listeners.get( name )(); }
  };
}

function calculator( settings = {} ) {
  const data = {
    basePrice: '1500', includedPages: '1', extraPagePrice: '300',
    maxPages: '12', contactEmail: 'studio@example.test', ...settings
  };
  const parts = Object.fromEntries( [
    '.prw-page-count', '.prw-error', '.prw-base-price', '.prw-extra-price',
    '.prw-total', '.prw-email-link', '.prw-decrease', '.prw-increase'
  ].map( selector => [ selector, element() ] ) );
  parts[ '.prw-page-count' ].value = data.includedPages;
  const card = { dataset: data, querySelector: selector => parts[ selector ] };
  const document = { querySelectorAll: selector => selector === '.prw-calculator' ? [ card ] : [] };
  vm.runInNewContext( script, { document, Intl } );
  const get = selector => parts[ selector ];
  return {
    get,
    enter( value ) { get( '.prw-page-count' ).value = value; get( '.prw-page-count' ).dispatch( 'input' ); }
  };
}

function amount( text ) { return text.replace( /\s/g, ' ' ); }
function message( href ) {
  const url = new URL( href );
  return { address: url.pathname, subject: url.searchParams.get( 'subject' ), body: url.searchParams.get( 'body' ) };
}

test( 'pakiet bazowy i dopłata są zgodne z regułą z PRD', () => {
  const c = calculator();
  assert.equal( amount( c.get( '.prw-total' ).textContent ), '1500 zł' );
  assert.equal( amount( c.get( '.prw-extra-price' ).textContent ), '0 zł' );
  c.enter( '2' );
  assert.equal( amount( c.get( '.prw-base-price' ).textContent ), '1500 zł' );
  assert.equal( amount( c.get( '.prw-extra-price' ).textContent ), '300 zł' );
  assert.equal( amount( c.get( '.prw-total' ).textContent ), '1800 zł' );
  const email = message( c.get( '.prw-email-link' ).href );
  assert.equal( email.address, 'studio@example.test' );
  assert.match( email.subject, /liczba podstron: 2/ );
  assert.match( email.body, /liczbą podstron: 2/ );
  assert.match( amount( email.body ), /1800 zł/ );
} );

test( 'niepoprawna wartość nie daje wyceny ani aktywnego zapytania', () => {
  const c = calculator();
  c.enter( '0' );
  assert.equal( c.get( '.prw-total' ).textContent, '—' );
  assert.equal( c.get( '.prw-extra-price' ).textContent, '—' );
  assert.equal( c.get( '.prw-page-count' ).getAttribute( 'aria-invalid' ), 'true' );
  assert.equal( c.get( '.prw-error' ).hidden, false );
  assert.equal( c.get( '.prw-email-link' ).getAttribute( 'href' ), null );
  assert.equal( c.get( '.prw-email-link' ).getAttribute( 'aria-disabled' ), 'true' );
  c.enter( '2' );
  assert.equal( amount( c.get( '.prw-total' ).textContent ), '1800 zł' );
  assert.equal( c.get( '.prw-email-link' ).getAttribute( 'aria-disabled' ), null );
} );

test( 'kalkulator korzysta z podanych parametrów', () => {
  const c = calculator( { basePrice: '2500', includedPages: '2', extraPagePrice: '400', contactEmail: 'nowy@example.test' } );
  assert.equal( amount( c.get( '.prw-total' ).textContent ), '2500 zł' );
  c.enter( '3' );
  assert.equal( amount( c.get( '.prw-extra-price' ).textContent ), '400 zł' );
  assert.equal( amount( c.get( '.prw-total' ).textContent ), '2900 zł' );
  const email = message( c.get( '.prw-email-link' ).href );
  assert.equal( email.address, 'nowy@example.test' );
  assert.match( amount( email.body ), /2900 zł/ );
} );
