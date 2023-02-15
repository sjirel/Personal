
// Include gulp
var gulp = require('gulp'),
        imagemin = require('gulp-imagemin'),
        sass = require('gulp-sass'),
        concat = require('gulp-concat'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        gcmq = require('gulp-group-css-media-queries'),
        plumber = require('gulp-plumber'),
        autoprefixer = require('gulp-autoprefixer'),
        browserSync = require('browser-sync').create();
// Prevent errors from breaking / crashing gulp watch

var reload = browserSync.reload;

function swallowError(error) {
    console.log(error.toString())
    this.emit('end')
}

//Imagemin Jpettran
gulp.task('compress-images', function () {
    return gulp.src('images/build/*')
            .on('error', swallowError)
            .pipe(imagemin({
                optimizationLevel: 6,
                progressive: true
            }))
            .pipe(gulp.dest('images/'));
});

/**
 * Task: `browser-sync`.
 *
 */
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: true,
    });
});

gulp.task('html', function () {
    gulp.src('*.html')
            .pipe(browserSync.stream());
});
// Compile Sass
gulp.task('sass', function () {
    return gulp.src('css/build/*.scss')
            .pipe(sass())
            .on('error', swallowError)
            .pipe(autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('css/build/'));
});



gulp.task('cmq', ['sass'], function () {
    gulp.src('css/build/master.css')
            .pipe(gcmq())
            .on('error', swallowError)
            .pipe(gulp.dest('.tmp/styles/'))
            .pipe(rename('main.css'))
            .pipe(gulp.dest('css'))
            .pipe(browserSync.stream());
});

//Concatenate and minify Js
gulp.task('vendorscripts', function () {
    return gulp.src('js/build/vendor/*.js')
            .pipe(concat('plugins.js'))
            .pipe(rename('plugins.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('js'));
});
//Minify JS
gulp.task('scripts', function () {
    return gulp.src('js/build/custom/*.js')
            .pipe(plumber())
            .pipe(rename('scripts.min.js'))
            .pipe(gulp.dest('js'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(['*.html'], ['html']);
    gulp.watch('images/build/*', ['compress-images']).on("change", reload);
    gulp.watch('css/build/*.scss', ['sass']);
    gulp.watch('css/build/master.css', ['cmq']);
    gulp.watch('js/build/vendor/*.js', ['vendorscripts']).on("change", reload);
    gulp.watch('js/build/custom/*.js', ['scripts']).on("change", reload);

});



// Default Task
gulp.task('default', ['sass', 'compress-images', 'cmq', 'vendorscripts', 'scripts', 'watch', 'browser-sync']);
