const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('./public_html');

mix.options({
  processCssUrls: false
});

mix.js('resources/js/app.js', '/js')
    .sass('resources/sass/app.scss', './public_html/css');
