<?php
/**
 * Plugin Name: Indian Steel Web Portal
 * Plugin URI: https://indiansteel.online
 * Description: Embeds the complete Indian Steel web application (Steel Weight Calculator, Quote Engine, CNC Laser Simulation, Customer & Admin Portals) into any WordPress site using the shortcode [indian_steel_portal].
 * Version: 1.0.0
 * Author: Indian Steel Team
 * Author URI: https://indiansteel.online
 * License: GPL2
 */

if (!defined('ABSPATH')) {
    exit;
}

function indian_steel_portal_shortcode() {
    // Enqueue Assets (Outfit, Plus Jakarta Sans, Space Grotesk, JetBrains Mono)
    wp_enqueue_style('indian-steel-fonts', 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap', array(), null);
    wp_enqueue_style('indian-steel-css', plugins_url('assets/index-D4DaCWZq.css', __FILE__), array(), '2.8.0');
    wp_enqueue_script('indian-steel-js', plugins_url('assets/index-uxu5GawI.js', __FILE__), array(), '2.8.0', true);

    ob_start();
    ?>
    <div id="root" class="indian-steel-plugin-wrapper" style="min-height: 100vh; background: #0C0E12;"></div>
    <?php
    return ob_get_clean();
}
add_shortcode('indian_steel_portal', 'indian_steel_portal_shortcode');
add_shortcode('indian_steel_app', 'indian_steel_portal_shortcode');

// Add module script tag
add_filter('script_loader_tag', function($tag, $handle, $src) {
    if ('indian-steel-js' === $handle) {
        $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}, 10, 3);
