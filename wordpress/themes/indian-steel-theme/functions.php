<?php
/**
 * Indian Steel Theme Functions and Definitions
 * Domain: indiansteel.online
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function indian_steel_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo');
}
add_action('after_setup_theme', 'indian_steel_theme_setup');

function indian_steel_enqueue_scripts() {
    // Google Fonts (Outfit, Plus Jakarta Sans, Space Grotesk, JetBrains Mono)
    wp_enqueue_style('indian-steel-fonts', 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap', array(), null);

    // Production Bundled CSS
    wp_enqueue_style('indian-steel-app-css', get_template_directory_uri() . '/assets/index-7FmhnyVg.css', array(), '1.7.0');

    // Production Bundled JS (React SPA)
    wp_enqueue_script('indian-steel-app-js', get_template_directory_uri() . '/assets/index-D7_OfOTM.js', array(), '1.8.0', true);
}
add_action('wp_enqueue_scripts', 'indian_steel_enqueue_scripts');

// Add module type attribute to the script tag for modern Vite ES Module bundling
function indian_steel_add_module_to_script($tag, $handle, $src) {
    if ('indian-steel-app-js' === $handle) {
        $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}
add_filter('script_loader_tag', 'indian_steel_add_module_to_script', 10, 3);
