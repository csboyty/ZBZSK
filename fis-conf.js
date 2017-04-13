/**
 * 将 fis 的构建根目录切换到 ./src 目录下，以便更好的管理源代码
 */
fis.project.setProjectRoot('src');

/*fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true
    })
});*/

fis.match('/{pages,components}/(*)/(*).html', {
    isMod: true,
    release: '/$2'
});
fis.match('/{pages,components}/**/*.css', {
    isMod: true,
    release: '/static/css/src/$0'
});
fis.match('/{pages,components}/**/*.js', {
    isMod: true,
    release: '/static/js/src/$0'
});

/**
 * 发布上线的版本
 */
fis.project.currentMedia() === 'dist' && fis.util.del(fis.project.getProjectPath('./public'));

fis.media('dist')
    .match('*.{js,css,less,png,jpg,jpeg,gif,svg}', {
        useHash: false
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match('*.{css,less}', {
        optimizer: fis.plugin('clean-css')
    })
    .match('*.{js,tpl}', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.min.js', {
        optimizer: null
    });