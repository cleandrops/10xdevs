( function () {
  var formatter = new Intl.NumberFormat( 'pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 } );
  function quote( pages, settings ) {
    if ( ! Number.isInteger( pages ) || pages < 1 || pages > settings.maxPages ) { return null; }
    var extraPages = Math.max( 0, pages - settings.includedPages );
    return { extraCost: extraPages * settings.extraPagePrice, total: settings.basePrice + extraPages * settings.extraPagePrice };
  }
  document.querySelectorAll( '.prw-calculator' ).forEach( function ( card ) {
    var settings = {
      basePrice: Number( card.dataset.basePrice ),
      includedPages: Number( card.dataset.includedPages ),
      extraPagePrice: Number( card.dataset.extraPagePrice ),
      maxPages: Number( card.dataset.maxPages ),
      contactEmail: card.dataset.contactEmail
    };
    var input = card.querySelector( '.prw-page-count' );
    var error = card.querySelector( '.prw-error' );
    var base = card.querySelector( '.prw-base-price' );
    var extra = card.querySelector( '.prw-extra-price' );
    var total = card.querySelector( '.prw-total' );
    var email = card.querySelector( '.prw-email-link' );
    function render() {
      var pages = Number( input.value );
      var result = input.value.trim() === '' ? null : quote( pages, settings );
      base.textContent = formatter.format( settings.basePrice );
      if ( ! result ) {
        error.hidden = false;
        error.textContent = 'Podaj liczbę całkowitą od 1 do ' + settings.maxPages + '.';
        input.setAttribute( 'aria-invalid', 'true' );
        extra.textContent = '—'; total.textContent = '—';
        email.removeAttribute( 'href' ); email.setAttribute( 'aria-disabled', 'true' );
        return;
      }
      error.hidden = true; error.textContent = ''; input.removeAttribute( 'aria-invalid' );
      extra.textContent = formatter.format( result.extraCost );
      total.textContent = formatter.format( result.total );
      email.removeAttribute( 'aria-disabled' );
      var subject = 'Zapytanie o stronę WordPress — liczba podstron: ' + pages;
      var body = 'Dzień dobry,\n\nInteresuje mnie strona WordPress z liczbą podstron: ' + pages + '.\nOrientacyjna wycena z kalkulatora: ' + formatter.format( result.total ) + '.\nProszę o kontakt i omówienie zakresu.\n\nPozdrawiam';
      email.href = 'mailto:' + settings.contactEmail + '?subject=' + encodeURIComponent( subject ) + '&body=' + encodeURIComponent( body );
    }
    input.addEventListener( 'input', render );
    card.querySelector( '.prw-decrease' ).addEventListener( 'click', function () { input.value = String( Math.max( 1, Number( input.value ) - 1 || 1 ) ); render(); } );
    card.querySelector( '.prw-increase' ).addEventListener( 'click', function () { input.value = String( Math.min( settings.maxPages, Number( input.value ) + 1 || 1 ) ); render(); } );
    render();
  } );
} )();
