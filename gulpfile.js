
var gulp = require("gulp");
var concat = require("gulp-concat");
var browserSync = require("browser-sync");
var del = require("del");
var bower = require("gulp-bower");
var babel = require("gulp-babel");
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');

gulp.task("scripts-libs", function() {
	return gulp.src([
        'src/libs/axios/dist/axios.min.js',
        'src/libs/playcanvas/ammo.js',
        'src/libs/playcanvas/playcanvas-stable.js',
	])
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest("dist/js"));
});

gulp.task("scripts", [], function() {

    browserify({
        entries: 'src/start.js',
        debug: true
    })
	.transform(babelify.configure({
		presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-class-properties"]
	}))
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js/'));

	/*return gulp.src(["src/js/!**"])

		.pipe(babel({
            presets: ['@babel/env'],
            plugins: ["@babel/plugin-proposal-class-properties"]
        }))
		.pipe(gulp.dest("dist/js"));*/
	
});

gulp.task("clean", function() {
	return del.sync("dist");
});

gulp.task("build", ['clean','scripts-libs', 'scripts'], function() {
	gulp.src("src/index.html").pipe(gulp.dest("dist/"));
	gulp.src("src/config/**").pipe(gulp.dest("dist/config"));
	gulp.src("src/assets/**").pipe(gulp.dest("dist/assets/"));
});

gulp.task("config", [], function() {
    gulp.src("src/config/**").pipe(gulp.dest("dist/config/"));
});

gulp.task('bower', function() {
    return bower({ cmd: 'update'})
        .pipe(gulp.dest('vendor/'))
});

gulp.task("browser-sync", function() {
	browserSync({
        open: false,
		server: {
			baseDir: "dist"
		}
	})
});

gulp.task("watch", ['browser-sync'], function() {
	gulp.watch(["src/start.js","src/js/**", "src/config/**"],  ['scripts', 'config'], browserSync.reload);
});

