let mix = require('laravel-mix');

mix.js('resources/js/src/app.js', 'public/js/app.js').sass('resources/scss/app.scss','public/css/app.css');