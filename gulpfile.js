const {src, dest, watch, parallel, series} = require('gulp');

const sass         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');

function browsersync () {
    browserSync.init ({
        server: {
            baseDir:'src/'
        }
    });
}

function cleanDist() {
    return del('dist')
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

function styles() {
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

function build() {
    return src([
        'src/css/style.min.css',
        'src/fonts/**/*',
        'src/js/script.min.js',
        'src/*.html'
    ], {base: 'src'})
        .pipe(dest('dist')) 
} 

function images() {
    return src('src/img/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/img'))
}

function watching() {
    watch(['src/sass/**/*.sass'], styles);
    watch(['src/js/**/*.js','!src/js/script.min.js'], scripts);
    watch('src/*.html').on ('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.images = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);