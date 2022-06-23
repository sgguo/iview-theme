const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const less = require('gulp-less')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const series = require('gulp4-run-sequence').use(gulp)
const path = require('path')
const ora = require('ora')


module.exports = function(output) {
  // 编译less
  gulp.task('css', function() {
    const spinner = ora('compiling less').start()
    return gulp.src('./index.less')
      .pipe(less())
      .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie > 8']
      }))
      .pipe(cleanCSS())
      .pipe(rename('theme.css'))
      .pipe(gulp.dest(output))
      .on('err', err => spinner.failed(err))
      .on('end', () => spinner.succeed())
  })

  // 拷贝字体文件
  gulp.task('fonts', function() {
    const spinner2 = ora('copying fonts').start()
    return gulp.src('./common/iconfont/fonts/*.*')
      .pipe(gulp.dest(path.resolve(output, './fonts')))
      .on('err', err => spinner.failed(err))
      .on('end', () => spinner2.succeed())
  })

  series('css', 'fonts')
}
