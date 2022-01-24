const {src, dest, watch, parallel} = require('gulp');

const sass         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');

function browsersync () {
    browserSync.init ({
        server: {
            baseDir:'src/'
        }
    })
}

function scripts() {
    return src([
        'src/js/slick.min.js',
        'src/js/jquery.validate.min.js',
        'src/js/jquery.maskedinput.js',
        'src/js/wow.js',
        'src/js/script.js'
    ])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(dest('src/js'))
        .pipe(browserSync.stream())
}

function styles () {
    return src('src/sass/blocks/style.sass')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid:true
        }))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream());
}

function watching () {
    watch(['src/sass/**/*.sass'], styles);
    watch(['src/js/**/*.js','!src/js/script.min.js'], scripts);
    watch('src/*.html').on ('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;

exports.default = parallel(scripts, browsersync, watching);