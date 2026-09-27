( function ( blocks, element, blockEditor ) {
  var el = element.createElement;
  blocks.registerBlockType( 'prw/quote-calculator', {
    edit: function () {
      return el( 'div', blockEditor.useBlockProps( { style: { padding: '24px', border: '1px solid #c6d9c9', background: '#f3faf4' } } ),
        el( 'strong', null, 'Kalkulator wyceny strony' ),
        el( 'p', null, 'Na opublikowanej stronie wyświetli się interaktywny kalkulator. Ceny zmienisz w Ustawienia → Wycena strony.' )
      );
    },
    save: function () { return null; }
  } );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );
