var elixir  = require('laravel-elixir'),
  gulp    = require('gulp'),
  babel   = require('gulp-babel'),
  nodemon = require('gulp-nodemon'),
  exec    = require('child_process').exec;

elixir.extend('babelify', function() {
  new elixir.Task('babelify', function() {
    return gulp.src('src/server/**/*.jsx')
      .pipe(babel())
      .pipe(gulp.dest('dist/server'));
  })
  .watch('./src/server/**/*.jsx');
});

gulp.task('start', ['default'], function () {
  nodemon({
  script: 'dist/server/app.js',
  ext: 'js mustache',
  watch: [
    'src/server/',
    'src/server/routes',
    'src/server/view',
  ],
  env: {
    NODE_ENV: 'development'
  },
  tasks: function (changedFiles) {
    return ['default'];
  }
  })
});

gulp.task('run', ['default'], function () {
  return exec('node dist/server/app.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);

    cb(err);
  });
});

elixir(function(mix) {
  mix.babelify();

  mix.copy('src/server/views/**/*.mustache', 'dist/server/views');
});
