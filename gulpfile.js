const gulp = require('gulp');

//Tasks
require('./gulp/dev.js');
require('./gulp/prod.js');


gulp.task('default', 
	gulp.series(
		'clean:dev',
		gulp.parallel('pug:dev','sass:dev', 'images:dev', 'js:dev', 'fonts:dev'),
		gulp.parallel('server:dev', 'watch:dev')
	)
);

gulp.task('prod', 
	gulp.series(
		'clean:docs',
		gulp.parallel('pug:docs','sass:docs', 'images:docs', 'fonts:docs', 'js:docs'),
		gulp.parallel('server:docs')
	)
);