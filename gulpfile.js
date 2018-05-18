
var gulp = require("gulp");
var scss = require("gulp-scss");
var concat = require("gulp-concat");
var uglify = require("gulp-uglifyjs");
var browserSync= require("browser-sync");
var autoprefixer = require("gulp-autoprefixer");
var del = require("del");
var bower = require("gulp-bower");
var imageMin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var babel = require("gulp-babel");
var jimp = require("gulp-jimp-resize");

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

	return gulp.src(["src/js/**"])
		.pipe(babel({
            presets: ['@babel/env'],
            plugins: ["@babel/plugin-proposal-class-properties"]
        }))
		.pipe(gulp.dest("dist/js"));
	
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
		server: {
			baseDir: "dist"
		}
	})
});

gulp.task("watch", ['browser-sync'], function() {
	gulp.watch(["src/js/**", "src/config/**"],  ['scripts', 'config'], browserSync.reload);
});

