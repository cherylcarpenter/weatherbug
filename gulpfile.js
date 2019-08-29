var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();
    webpack_stream = require('webpack-stream');
    webpack_config = require("./webpack.config");
    
var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "src/scss/**/*.scss",
        sass: "src/scss/**/*.sass",
        jsSrc: "src/**/*.js",
        // //watch
        Html: "index.html",
        jsFinal: "dist/js",
        // // Compiled files will end up in whichever folder it's found in (partials are not compiled)

        final: "dist/css",
        fonts: "dist/webfonts"

    }

    // Easily add additional paths
    // ,html: {
    //  src: '...',
    //  dest: '...'
    // }
};

function style() {
    return gulp
        .src(paths.styles.src)
        // Initialize sourcemaps before compilation starts
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        // Use postcss with autoprefixer and compress the compiled file using cssnano
        .pipe(postcss([autoprefixer(), cssnano()]))
        // Now add/write the sourcemaps
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.final))
        // Add browsersync stream pipe after compilation
        .pipe(browserSync.stream())


};


function webpack(){
    return webpack_stream(webpack_config)
    .pipe(gulp.dest(paths.styles.jsFinal))
    .pipe(browserSync.stream())

};

function mySync(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
};


// Add browsersync initialization at the start of the watch task
function watch() {

    gulp.watch(paths.styles.src, style).on('change', browserSync.reload);
    gulp.watch(paths.styles.sass, style).on('change', browserSync.reload);
    gulp.watch(paths.styles.jsSrc, webpack).on('change', browserSync.reload);
    gulp.watch(paths.styles.Html).on('change', browserSync.reload);
    gulp.watch(paths.styles.jsFinal).on('change', browserSync.reload);

};

gulp.task('fonts', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*.*')
      .pipe(gulp.dest(paths.styles.fonts))
  });


// Don't forget to expose the task!
exports.watch = watch;
exports.webpack = webpack;
// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;
exports.mySync = mySync;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */

 
var build = gulp.parallel(style, webpack, mySync, watch)
/*
 * You can still use `gulp.task` to expose tasks
 */
//gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);
