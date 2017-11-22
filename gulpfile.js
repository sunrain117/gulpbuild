/**
 * Created by ssh on 2017/2/22.
 */
const gulp=require('gulp'),
    cleanCss=require('gulp-clean-css'),//minify css
    sass=require('gulp-sass'),// compile scss
    uglify=require('gulp-uglify'),//minify js
    connect=require('gulp-connect'),//create webservice auto livereload
    htmlmin=require('gulp-htmlmin'),//minify html
    imagemin=require('gulp-imagemin');//optimize image (png,jpg,gif,svg)
    //gulp-html-src  replace html tag like script or css

gulp.task('sass',()=>
gulp.src(['!./src/scss/variable.scss','./src/scss/*.*'])
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(connect.reload())
);

gulp.task('uglify',()=>
gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
);

gulp.task('imagemin',()=>
gulp.src('./src/img/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'))
);

gulp.task('html',()=>
gulp.src('./*.html')
    .pipe(connect.reload())
   /* .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest('./dist/'))*/
);

gulp.task('connect',()=>
connect.server({
    livereload:true,
    port:8080
})
);

gulp.task('watch',()=>{
        gulp.watch('./*.html',['html']);
        gulp.watch('./src/scss/*.scss',['sass']);
        gulp.watch('./src/js/*.js',['uglify']);
}
);

gulp.task('default',['sass','uglify','imagemin','html','watch','connect']);