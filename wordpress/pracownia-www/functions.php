<?php
/**
 * Theme assets for Pracownia WWW.
 *
 * @package PracowniaWWW
 */

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style(
		'pracownia-www',
		get_stylesheet_uri(),
		array(),
		wp_get_theme()->get( 'Version' )
	);
} );
