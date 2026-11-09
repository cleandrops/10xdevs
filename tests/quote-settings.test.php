<?php
// Minimal WordPress stubs keep this regression test independent of the database.
define( 'ABSPATH', __DIR__ );
$settings_errors = array();
$saved_settings = array( 'contact_email' => 'studio@example.test', 'base_price' => 2500 );
function add_action() {}
function add_shortcode() {}
function sanitize_email( $email ) { return filter_var( $email, FILTER_SANITIZE_EMAIL ); }
function is_email( $email ) { return filter_var( $email, FILTER_VALIDATE_EMAIL ); }
function absint( $value ) { return abs( (int) $value ); }
function get_option( $key, $default = false ) { global $saved_settings; return $saved_settings; }
function wp_parse_args( $args, $defaults ) { return array_merge( $defaults, $args ); }
function add_settings_error( $setting, $code, $message, $type ) {
	global $settings_errors;
	$settings_errors[] = compact( 'setting', 'code', 'message', 'type' );
}
require __DIR__ . '/../wordpress/pracownia-wycena/pracownia-wycena.php';

$result = prw_sanitize_quote_settings( array( 'contact_email' => 'niepoprawny-adres', 'base_price' => 9999 ) );
if ( 'studio@example.test' !== $result['contact_email'] ) {
	throw new RuntimeException( 'Niepoprawny adres musi zachować poprzednią wartość.' );
}
if ( 2500 !== $result['base_price'] ) {
	throw new RuntimeException( 'Błędny formularz nie może częściowo zmienić wyceny.' );
}
if ( count( $settings_errors ) !== 1 || 'error' !== $settings_errors[0]['type'] ) {
	throw new RuntimeException( 'Administrator musi zobaczyć błąd zapisu.' );
}
$valid = prw_sanitize_quote_settings( array( 'contact_email' => 'nowy@example.test', 'base_price' => 3000 ) );
if ( 'nowy@example.test' !== $valid['contact_email'] || 3000 !== $valid['base_price'] || count( $settings_errors ) !== 1 ) {
	throw new RuntimeException( 'Poprawne parametry muszą zostać przyjęte bez nowego błędu.' );
}
echo "OK: błędny adres zachowuje poprzednie parametry i zgłasza błąd; poprawny zapis działa\n";
