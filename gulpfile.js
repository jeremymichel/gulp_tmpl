var gulp = require('gulp'),
	compass = require('gulp-compass'),
	plumber = require('gulp-plumber'),
	connect = require('gulp-connect');

var config = {
	scssDir : './scss',
	cssDir : './css',
	htmlDir : '.',
	jsDir : './js',
	watchCss : false,
	scssFiles : function(){
		return this.scssDir + '/*.scss';
	},
	cssFiles : function(){
		return this.cssDir + '/*.css';
	},
	jsFiles : function(){
		return this.jsDir + '/*.js';
	},
	htmlFiles : function(){
		return this.htmlDir + '/*.html';
	}
}

gulp.task('connect', function(){
	connect.server({
		port : 80,
		livereload: true
	});
});

gulp.task('compass', function(){
	gulp.src(config.scssFiles())
		.pipe(plumber())
		.pipe(compass({
			css: config.cssDir,
			sass: config.scssDir
		}))
		.pipe(gulp.dest(config.cssDir))
		.pipe(connect.reload());
});

gulp.task('js', function(){
	gulp.src(config.jsFiles())
		.pipe(connect.reload());
});

gulp.task('css', function(){
	gulp.src(config.cssFiles())
		.pipe(connect.reload());
});

gulp.task('html', function(){
	gulp.src(config.htmlFiles())
		.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch([config.scssFiles()], ['compass']);
	gulp.watch([config.htmlFiles()], ['html']);
	gulp.watch([config.jsFiles()], ['js']);
	if(config.watchCss) gulp.watch([config.cssFiles()], ['css']);
});

gulp.task('default', ['connect', 'compass', 'watch']);
