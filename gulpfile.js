let gulp = require('gulp');
let less = require('gulp-less');

let concat = require('gulp-concat');
let sourcemaps = require('gulp-sourcemaps');
let cleanCss = require('gulp-clean-css');
let browserSync = require('browser-sync').create();

let config = {
    paths: {
        less: './src/less/**/*.less',
        html: './public/index.html'
    },
    output: {
        cssName: 'bundle.min.css',
        path: './public'
    }
};

gulp.task('less', function() {
    return gulp.src(config.paths.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat(config.output.cssName))

        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(config.paths.less, gulp.parallel('less'));
    gulp.watch(config.paths.html).on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('less', 'serve'));
