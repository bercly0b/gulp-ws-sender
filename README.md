## usage
```sh
const gulp = require('gulp')
const sender = require('gulp-ws-sender')(9999) // port

gulp.task('styles', () => {
  return gulp.src('src/**/*.css')
    .pipe(sender({ type: 'css' })) // or type: 'js'
    .pipe(gulp.dest('public'))
})

```

For live injection of your script and styles on any page. Use with [chrome extention](https://github.com/bercly0b/injector-chrome-extension)
