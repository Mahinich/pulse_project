const {src, dest, watch, parallel} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function browsersync () {
    browserSync.init ({
        server: {
            baseDir:'src/'
        }
    })
}

function styles () {
    return src('src/sass/blocks/style.scss')
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
    watch(['src/sass/**/*.scss'], styles);
    watch('src/*.html').on ('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(browsersync, watching);