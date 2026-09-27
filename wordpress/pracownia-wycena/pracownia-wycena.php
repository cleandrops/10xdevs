<?php
/**
 * Plugin Name: Pracownia WWW — Wycena
 * Description: Blok Gutenberga obliczający orientacyjną cenę strony WordPress.
 * Version: 0.1.0
 * Requires at least: 6.6
 * Text Domain: pracownia-wycena
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function prw_quote_defaults() {
	return array(
		'base_price'       => 1500,
		'included_pages'   => 1,
		'extra_page_price' => 300,
		'max_pages'        => 12,
		'contact_email'    => 'kontakt@example.com',
	);
}

function prw_quote_settings() {
	return wp_parse_args( get_option( 'prw_quote_settings', array() ), prw_quote_defaults() );
}

add_shortcode( 'prw_contact_email', function () {
	$email = prw_quote_settings()['contact_email'];
	return sprintf( '<a href="mailto:%1$s">%2$s ↗</a>', esc_attr( $email ), esc_html( $email ) );
} );

function prw_sanitize_quote_settings( $raw ) {
	$defaults = prw_quote_defaults();
	$raw      = is_array( $raw ) ? $raw : array();
	$max      = min( 100, max( 1, absint( $raw['max_pages'] ?? $defaults['max_pages'] ) ) );
	$email    = sanitize_email( $raw['contact_email'] ?? $defaults['contact_email'] );
	return array(
		'base_price'       => min( 10000000, absint( $raw['base_price'] ?? $defaults['base_price'] ) ),
		'included_pages'   => min( $max, max( 1, absint( $raw['included_pages'] ?? $defaults['included_pages'] ) ) ),
		'extra_page_price' => min( 10000000, absint( $raw['extra_page_price'] ?? $defaults['extra_page_price'] ) ),
		'max_pages'        => $max,
		'contact_email'    => is_email( $email ) ? $email : $defaults['contact_email'],
	);
}

add_action( 'admin_init', function () {
	register_setting(
		'prw_quote_group',
		'prw_quote_settings',
		array(
			'type'              => 'array',
			'sanitize_callback' => 'prw_sanitize_quote_settings',
			'default'           => prw_quote_defaults(),
		)
	);
	add_settings_section( 'prw_quote_main', 'Parametry wyceny', '__return_false', 'prw-quote' );
	$fields = array(
		'base_price'       => array( 'Cena pakietu bazowego (zł)', 'number' ),
		'included_pages'   => array( 'Podstrony w pakiecie', 'number' ),
		'extra_page_price' => array( 'Cena dodatkowej podstrony (zł)', 'number' ),
		'max_pages'        => array( 'Maksymalna liczba podstron', 'number' ),
		'contact_email'    => array( 'Adres kontaktowy', 'email' ),
	);
	foreach ( $fields as $key => $field ) {
		add_settings_field(
			'prw_' . $key,
			$field[0],
			function () use ( $key, $field ) {
				$value = prw_quote_settings()[ $key ];
				printf(
					'<input class="regular-text" type="%1$s" name="prw_quote_settings[%2$s]" value="%3$s" %4$s required>',
					esc_attr( $field[1] ),
					esc_attr( $key ),
					esc_attr( $value ),
					'number' === $field[1] ? 'min="0" step="1"' : ''
				);
			},
			'prw-quote',
			'prw_quote_main'
		);
	}
} );

add_action( 'admin_menu', function () {
	add_options_page( 'Wycena strony', 'Wycena strony', 'manage_options', 'prw-quote', function () {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		?>
		<div class="wrap"><h1>Wycena strony</h1>
		<p>Kwoty są przykładowe. Zmień je i adres e-mail przed pokazaniem strony klientom.</p>
		<form method="post" action="options.php">
			<?php settings_fields( 'prw_quote_group' ); ?>
			<?php do_settings_sections( 'prw-quote' ); ?>
			<?php submit_button( 'Zapisz parametry' ); ?>
		</form></div>
		<?php
	} );
} );

function prw_render_quote_calculator() {
	$s     = prw_quote_settings();
	$input = wp_unique_id( 'prw-page-count-' );
	$help  = wp_unique_id( 'prw-help-' );
	$error = wp_unique_id( 'prw-error-' );
	ob_start();
	?>
	<div class="calculator-card prw-calculator"
		data-base-price="<?php echo esc_attr( $s['base_price'] ); ?>"
		data-included-pages="<?php echo esc_attr( $s['included_pages'] ); ?>"
		data-extra-page-price="<?php echo esc_attr( $s['extra_page_price'] ); ?>"
		data-max-pages="<?php echo esc_attr( $s['max_pages'] ); ?>"
		data-contact-email="<?php echo esc_attr( $s['contact_email'] ); ?>">
		<div class="calculator-head"><span>KALKULATOR</span><span>PLN / KWOTA PRZYKŁADOWA</span></div>
		<div class="calculator-body">
			<label for="<?php echo esc_attr( $input ); ?>">Ile podstron potrzebujesz?</label>
			<p class="field-help" id="<?php echo esc_attr( $help ); ?>">Strona główna liczy się jako jedna podstrona. Wybierz od 1 do <?php echo esc_html( $s['max_pages'] ); ?>.</p>
			<div class="number-control"><button type="button" class="prw-decrease" aria-label="Zmniejsz liczbę podstron">−</button><input class="prw-page-count" id="<?php echo esc_attr( $input ); ?>" type="number" inputmode="numeric" min="1" max="<?php echo esc_attr( $s['max_pages'] ); ?>" step="1" value="<?php echo esc_attr( $s['included_pages'] ); ?>" aria-describedby="<?php echo esc_attr( $help . ' ' . $error ); ?>"><button type="button" class="prw-increase" aria-label="Zwiększ liczbę podstron">+</button></div>
			<p class="field-error prw-error" id="<?php echo esc_attr( $error ); ?>" role="alert" hidden></p>
			<div class="price-breakdown"><div><span>Pakiet bazowy (<?php echo esc_html( $s['included_pages'] ); ?> <?php echo 1 === (int) $s['included_pages'] ? 'podstrona' : 'podstrony'; ?>)</span><strong class="prw-base-price"></strong></div><div><span>Dodatkowe podstrony</span><strong class="prw-extra-price"></strong></div></div>
			<div class="total-row"><span>Orientacyjnie</span><strong class="prw-total" aria-live="polite"></strong></div>
			<a class="button button-dark button-full prw-email-link" href="mailto:<?php echo esc_attr( $s['contact_email'] ); ?>">Zapytaj o tę stronę <span aria-hidden="true">↗</span></a>
			<p class="calculator-footnote">Kwoty są przykładowe. To wycena orientacyjna, a nie wiążąca oferta. Adres: <a href="mailto:<?php echo esc_attr( $s['contact_email'] ); ?>"><?php echo esc_html( $s['contact_email'] ); ?></a>.</p>
		</div>
	</div>
	<?php
	return ob_get_clean();
}

add_action( 'init', function () {
	wp_register_script(
		'prw-quote-editor',
		plugins_url( 'editor.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-block-editor' ),
		'0.1.0',
		true
	);
	wp_register_script(
		'prw-quote-view',
		plugins_url( 'view.js', __FILE__ ),
		array(),
		'0.1.0',
		true
	);
	register_block_type( __DIR__, array( 'render_callback' => 'prw_render_quote_calculator' ) );
} );
