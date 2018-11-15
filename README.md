## usage
```sh
const gulp = require('gulp')
const broadcast = require('gulp-ws-sender').broadcast(port)
const server = require('gulp-ws-sender').server

gulp.task('styles', () => {
  return gulp.src('src/**/*.css')
    .pipe(sender({
      type: 'css'
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('server', () => server({ port: port }))
```
