## usage
```sh
const gulp = require('gulp')
const sender = require('gulp-ws-sender')
const WebSocket = require('ws')

const ws = new WebSocket('ws://localhost:9999')

gulp.task('styles', () => {
  return gulp.src('src/**/*.css')
    .pipe(sender({
      socketClient: ws,
      type: 'css'
    }))
    .pipe(gulp.dest('public'))
})
```
