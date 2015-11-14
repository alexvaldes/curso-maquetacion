var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

//LEVANTA UN SERVIDOR LOCAL
var webserver = require('gulp-webserver');
//ACTUALIZAR EL NAVEGADOR AUTOMATICAMENTE
var livereload = require('gulp-livereload');

/**             STYLUS                **/
//PERMITE  COMPILAR STYLUS
var stylus = require('gulp-stylus');
//AGREGA PREFIJOS A LOS ATRIBUTOS CSS
var nib = require('nib');
//MINIFICA LOS CSS
var minifyCSS = require('gulp-minify-css');

/**             JS               **/
//MINIFICA JS
var uglify = require('gulp-uglify');

/**             JADE               **/
var jade = require('gulp-jade');

//BORRA LA CARPETA PUBLIC CADA VEZ QUE TRABAJE GULP
var clear = require('gulp-rimraf');


var config = {
	styles: {
		main: './src/styles/app.styl', 
		output: './build/css'
	},
	htmls: {
		main: './src/index.jade',
		output: './build'
	},
	scripts: {
		main: './src/scripts/app.js',
		output: './build/js'
	}
}

gulp.task('build:html', function(){
	gulp
		.src(config.htmls.main)
		.pipe(jade({
			pretty: true
			}))
		.pipe(gulp.dest(config.htmls.output));
	});

gulp.task('build:css', function(){
	gulp
		.src(config.styles.main)
		.pipe(stylus({
			use: nib(),
			'include css':true
			}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.styles.output));
	});

gulp.task('build:js', function(){
	gulp
		.src(config.scripts.main)
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.output));
	});