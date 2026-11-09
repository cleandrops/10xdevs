const { expect, test } = require( '@playwright/test' );

function numberFromPrice( text ) {
  return Number( text.replace( /[^\d]/g, '' ) );
}

test( 'odwiedzający widzi wycenę i zgodne z nią zapytanie e-mail', async ( { page }, testInfo ) => {
  await page.goto( '/#wycena' );
  const card = page.locator( '.prw-calculator' );
  await expect( card ).toBeVisible();
  const settings = await card.evaluate( element => ( { ...element.dataset } ) );
  const included = Number( settings.includedPages );
  const pages = included + 1;
  expect( pages ).toBeLessThanOrEqual( Number( settings.maxPages ) );
  const expected = Number( settings.basePrice ) + Number( settings.extraPagePrice );

  await card.getByRole( 'spinbutton', { name: 'Ile podstron potrzebujesz?' } ).fill( String( pages ) );
  await expect.poll( async () => numberFromPrice( await card.locator( '.prw-total' ).innerText() ) ).toBe( expected );
  const href = await card.getByRole( 'link', { name: 'Zapytaj o tę stronę' } ).getAttribute( 'href' );
  const email = new URL( href );
  expect( email.protocol ).toBe( 'mailto:' );
  expect( email.pathname ).toBe( settings.contactEmail );
  expect( email.searchParams.get( 'subject' ) ).toContain( `liczba podstron: ${pages}` );
  expect( email.searchParams.get( 'body' ) ).toContain( `liczbą podstron: ${pages}` );
  expect( numberFromPrice( email.searchParams.get( 'body' ).match( /wycena z kalkulatora: ([^.]*)/ )[ 1 ] ) ).toBe( expected );
  await page.screenshot( { path: testInfo.outputPath( 'desktop.png' ) } );
} );

test( 'telefon: błędna liczba blokuje wycenę, poprawa ją przywraca', async ( { page }, testInfo ) => {
  await page.setViewportSize( { width: 390, height: 844 } );
  await page.goto( '/#wycena' );
  const card = page.locator( '.prw-calculator' );
  const input = card.getByRole( 'spinbutton', { name: 'Ile podstron potrzebujesz?' } );
  await input.fill( '0' );
  await expect( input ).toHaveAttribute( 'aria-invalid', 'true' );
  await expect( card.locator( '.prw-error' ) ).toBeVisible();
  await expect( card.locator( '.prw-total' ) ).toHaveText( '—' );
  const contact = card.locator( '.prw-email-link' );
  await expect( contact ).toHaveAttribute( 'aria-disabled', 'true' );
  await expect( contact ).not.toHaveAttribute( 'href', /./ );
  expect( await page.evaluate( () => document.documentElement.scrollWidth <= window.innerWidth + 1 ) ).toBe( true );
  await page.screenshot( { path: testInfo.outputPath( 'mobile-error.png' ) } );

  await input.fill( '1' );
  await expect( input ).not.toHaveAttribute( 'aria-invalid', 'true' );
  await expect( card.locator( '.prw-error' ) ).toBeHidden();
  await expect( contact ).toHaveAttribute( 'href', /^mailto:/ );
} );
