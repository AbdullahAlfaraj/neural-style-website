var elixir = require('laravel-elixir');
var del = require('del');
// elixir.config.publicPath = 'web';
elixir.extend('remove', function(path) {
    new elixir.Task('remove', function() {
        del(path);
    });
});
elixir(function(mix) {
    // your mixes here



    mix.sass('gui.scss');
    mix.sass('carousel.component.scss');
    mix.sass('popup.component.scss');
    mix.sass('submit-form.component.scss');
    
    mix.copy('node_modules/angular2', 'public/node_modules/angular2');
    mix.copy('node_modules/rxjs', 'public/node_modules/rxjs');
    mix.copy('node_modules/systemjs', 'public/node_modules/systemjs');
    mix.copy('node_modules/es6-promise', 'public/node_modules/es6-promise');
    mix.copy('node_modules/es6-shim', 'public/node_modules/es6-shim');
    mix.copy('node_modules/zone.js', 'public/node_modules/zone.js');
    
    mix.copy('node_modules/jquery', 'public/node_modules/jquery');
    mix.copy('node_modules/bootstrap', 'public/node_modules/bootstrap');



    mix.copy('resources/assets/typescript/*.js', 'public/app');

    mix.remove('resources/assets/typescript/*.js*');
});