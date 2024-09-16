const gulp = require('gulp'),
	spawn = require('child_process').spawn, // Spawns child process of this gulp script for the node server process.
	log = require('gulplog'), // For logging to stdio.
	del = require('del'), // For clearing the dist/ directory between builds.
	sourcemaps = require('gulp-sourcemaps'), // Includes TS -> JS sourcemaps for debugging.
	ts = require('gulp-typescript'), // Exposes TypeScript api to gulp.
	project = ts.createProject('tsconfig.json');

const paths = {
	server: 'dist/index.js', // Built server.
	src: 'src/**/*.ts', // Files to build after changes.
	watch: ['src/*ts', 'src/**/*.ts'] // Files to watch for changes.
};

const who = '[gulp] ';

let node;

/**
 * gulp watch
 * Watches the *.ts code in src/ for changes and (re)runs the server task series.
 */
gulp.task('watch', function () {
	gulp.watch(paths.watch, gulp.series('clean', 'build', 'server'));
});

/**
 * gulp server
 * (Re)Launches the node server process.
 */
gulp.task('server', function (done) {
	let re = 'S';
	if (node) {
		log.info(who + 'Killing running node process.');
		node.kill();
		re = 'Res';
	}
	node = spawn('node', ['--inspect=9229', paths.server], {stdio: 'inherit'})  // --inspect flag enables debugging for node on port 9229.
		.on('error', (error) => {
			log.error(who + error.toString());
			node.exit(0);
		})
		.on('exit', (code, signal) => {
			if (code) {
				log.info(who + 'Node child process exited with code: ' + code);
			}
			if (signal) {
				log.info(who + 'Exit signal: ' + signal);
			}
		});
	if (node) {
		log.info(who + re + 'pawned node child process with pid: ', node.pid);
	}
	done();
});

/**
 * gulp build
 * Compiles the src/**.ts files to dist/**.js.
 */
gulp.task('build', function () {
	return gulp.src(paths.src)
		.pipe(sourcemaps.init())
		.pipe(project())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'));
});

/**
 * gulp clean
 * Empties the contents of the dist/ directory.
 */
gulp.task('clean', function () {
	return del([
				   // '!some/dir' will blacklist from removal.
				   'dist/*',
			   ]);
});

/**
 * gulp
 * Default task. Executes the clean and build tasks, followed by the server and watch tasks in tandem.
 */
gulp.task('default', gulp.series('clean', 'build', gulp.parallel('server', 'watch')));

process.on('uncaughtException', (error) => {
	log.error(who + 'Uncaught Exception: ', error.toString());
	log.error(who + 'Stack: ' + error.stack.toString());
	process.exit(42);
});

/**
 * Kill the node child process if something goes wrong.
 */
process.on('exit', (code) => {
	if (node) {
		log.warn(who + 'Killing node.');
		node.kill();
	}
	log.info(who + 'Exited with code: ', code);
});
