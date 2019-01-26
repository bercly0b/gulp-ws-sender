For live injection of your script and styles to any page. Use with [chrome extention](https://chrome.google.com/webstore/detail/injector/fopkjckkihccjckhmikeclmkghlipbil?hl=en-GB)

## Usage
```js
const gulp = require('gulp')
const port = 9999
const sender = require('gulp-ws-sender')(port)

gulp.task('style', () => {
  return gulp.src('src/**/*.css')
    // your pipes
    .pipe(sender({ type: 'css' }))
    .pipe(gulp.dest('build'))
})

gulp.task('script', () => {
  return gulp.src('src/**/*.js')
    // your pipes
    .pipe(sender({ type: 'js' }))
    .pipe(gulp.dest('build'))
})
```
