import gulp from 'gulp';
import sass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import { createRequire } from "module";
import browserSync from 'browser-sync';

const require = createRequire(import.meta.url);
const sassCompiler = sass(dartSass);

// Sass compile task
function style() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sassCompiler({outputStyle: 'expanded'}).on('error', sassCompiler.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

// Watch task
function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

export { style, watch };