const gulp = require('gulp');
const clean = require('gulp-clean');
const pug = require('gulp-pug');
const webpHTML = require('gulp-webp-html');
const htmlclean = require('gulp-htmlclean');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
var webpCss = require('gulp-webp-css');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const babel = require('gulp-babel');
var jsmin = require('gulp-jsmin');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const changed = require('gulp-changed');
const fs = require('fs');



let browserSync = require('browser-sync').create();

const errorsNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: true
		})
	}
}


//Clean
gulp.task('clean:docs', function(done){
	if(fs.existsSync('./docs/')){
		return gulp.src('./docs/', {read: false})
            .pipe(clean());
	}

	done();	
});


//Pug
gulp.task('pug:docs', function(){
	return gulp.src('./src/pug/index.pug')
		.pipe(changed('./docs/', {hasChanged: changed.compareContents}))
		.pipe(plumber(errorsNotify('Pug')))
		.pipe(pug())
		.pipe(webpHTML())
		.pipe(htmlclean())
		.pipe(gulp.dest('./docs/'));
});


// Sass
gulp.task('sass:docs', function(){
	return gulp.src('./src/scss/style.scss')
		.pipe(changed('./docs/css/'))
		.pipe(plumber(errorsNotify('Scss')))
		.pipe(sass())
		.pipe(autoprefixer({cascade: true}))
		.pipe(webpCss())
		.pipe(csso())
		.pipe(gulp.dest('./docs/css/'))
});


//Images
gulp.task('images:docs', function(){
	return gulp.src('./src/img/**/*')
		.pipe(changed('./docs/img'))
		.pipe(webp())
		.pipe(gulp.dest('./docs/img/'))
		
		.pipe(gulp.src('./src/img/**/*'))
		.pipe(changed('./docs/img'))
		.pipe(imagemin({verbose: true}))
		.pipe(gulp.dest('./docs/img/'))
});


//Fonts
gulp.task('fonts:docs', function(){
	return gulp.src('./src/fonts/**/*')
		.pipe(changed('./docs/fonts'))
		.pipe(gulp.dest('./docs/fonts/'))
});


//Js
gulp.task('js:docs', function(){
	return gulp.src('./src/js/**/*.js')
		.pipe(changed('./docs/js'))
		.pipe(babel())
		.pipe(jsmin())
		.pipe(gulp.dest('./docs/js/'));
});


//Favicon
gulp.task('favicon:docs', function(){
	return gulp.src('./src/favicon.ico')
		.pipe(gulp.dest('./docs/'));
});


//Examples
gulp.task('examples:docs', function(){
	return gulp.src('./src/examples/**/*')
		.pipe(gulp.dest('./docs/examples/'));
});


//Server
gulp.task('server:docs', function(){
	browserSync.init({
		server: {
		  baseDir: './docs/'
		}
	  });
});