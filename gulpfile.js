var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

gulp.task('compile', function() {
	return browserify('./client/js/main.js', { debug: true })
		.bundle()
		//Pass desired output filename to vinyl-source-stream
		.pipe(source('bundle.js'))
		// Start piping stream to tasks!
		.pipe(gulp.dest('./client/build/'));
});

gulp.task('watch', function() {
	gulp.watch('./client/js/**/*.*', ['browserify']);
});