var elixir  = require('laravel-elixir'),
  gulp    = require('gulp'),
  babel   = require('gulp-babel'),
  nodemon = require('gulp-nodemon'),
  exec    = require('child_process').exec,
  path    = require('path'),
  dotenv   = require('dotenv');

dotenv.config();

elixir.extend('babelify', function() {
  new elixir.Task('babelify', function() {
    return gulp.src('src/server/**/*.jsx')
      .pipe(babel())
      .pipe(gulp.dest('dist'));
  })
  .watch('src/server/**/*.jsx');
});

gulp.task('start', ['default'], function () {
  nodemon({
    script: 'dist/app.js',
    ext: 'js mustache',
    watch: [
      'src/server/',
      'src/server/routes',
      'src/server/view',

      'src/client/sass',
      'src/client/scripts',
    ],
    env: {
      NODE_ENV: 'development'
    },
    tasks: function (changedFiles) {
      var tasks = [];

      changedFiles.forEach(function (file) {
        if (path.extname(file) === '.js' && !~tasks.indexOf('browserify')) tasks.push('browserify')
        if (path.extname(file) === '.scss' && !~tasks.indexOf('sass')) tasks.push('sass')
        if (path.extname(file) === '.jsx' && !~tasks.indexOf('babelify')) tasks.push('babelify')
        if (path.extname(file) === '.hjs' && !~tasks.indexOf('copy')) tasks.push('copy')
      });

      return tasks;
    }
  })
});

gulp.task('run', ['default'], function () {
  return exec('node dist/app.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);

  });
});

elixir(function(mix) {
  mix.babelify();

  mix.sass('app.scss', 'dist/static/css');

  mix.copy('src/server/views/**/*.hjs', 'dist/views');
  mix.copy('src/static/vendor/bootstrap-sass/assets/fonts/bootstrap', 'dist/static/fonts/bootstrap');

  mix.scripts([
    'src/client/vendor/angular/angular.js',
  ], 'dist/static/js/angular.js');

  mix.browserify('src/client/scripts/app.js', 'dist/static/js/app.js');
});
