<?php
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// ENQUEUE

//CSS auto version

add_action( 'wp_enqueue_scripts', 'flex_non_cached_stylesheet' );
function flex_non_cached_stylesheet() {

  $path_flex_css = get_stylesheet_directory() . '/wp_starter_theme.min.css';
  if (file_exists($path_flex_css)) wp_enqueue_style( 'wp_starter_theme-css', get_asset_url('wp_starter_theme.min.css'), array(), filemtime($path_flex_css) );

  wp_enqueue_style( 'style-main', get_asset_url('style.css'), array(), filemtime( get_stylesheet_directory() . '/style.css' ) );
  wp_enqueue_style( 'fontawesome', 'https://use.fontawesome.com/c81fe3ea32.css');

  wp_enqueue_script('jquery');
  wp_enqueue_script( 'mainjs', get_asset_url('js/main.min.js'), null, null, true );

  $path_flex_js = get_stylesheet_directory() . '/js/wp_starter_theme.min.js';
  if (file_exists($path_flex_js)) wp_enqueue_script( 'wp_starter_theme-js', get_asset_url('js/wp_starter_theme.min.js'), null, filemtime($path_flex_js), true );
  
  $vars = array( 'templateUrl' => get_stylesheet_directory_uri() );
  wp_localize_script( 'mainjs', 'wpGlobal', $vars );
  wp_localize_script( 'wp_starter_theme-js', 'wpGlobal', $vars );
}
