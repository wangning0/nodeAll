/**
 * path模块提供多种方法去解决文件／文件夹路径
 * require('path')
 */
const path = require('path');
/**
 * 该模块的使用取决于Node运行的操作系统
 * 因为分隔符不同\ /
 */

/**
 * path.basename(path[,ext])
 *  path string
 *  ext string 文件后缀名
 * 
 * 返回path的最后位置的string
 * 
 * 如果path不是一个字符串或者是被给定的ext不是字符串将会报错
 */
console.log(path.basename('/foo/bar/baz/a/test.html'));
console.log(path.basename('/foo/bar/baz/a/test.html', '.html'));

/**
 * path.delimiter  分割符
 *      <string>
 * 提供平台的分隔符
 */
console.log(process.env.PATH);
console.log(process.env.PATH.split(path.delimiter));


/**
 * path.dirname(path)
 *  返回你所在的目录的地址,如果path不是string则会报错
 */

console.log(path.dirname('/foo/cd/cd'));

/**
 * path.extname(path)
 *      返回path的后缀名
 * 如果没有.或者是第一个字符就是.那么返回的是空字符串
 */
console.log(path.extname('index.html'));
console.log(path.extname('index.'));
console.log(path.extname('.index'));
console.log(path.extname('index/home'));

/**
 * path.format(pathObject)
 *  pathObject
 *      dir
 *      root
 *      base
 *      name
 *      ext
 * 
 * 当pathObject.dir提供了那么toot就会被忽略
 * base提供了那么name ext会被忽略
 */
let test = path.format({
    dir: '/home/user/dir',
    base: 'file.txt'
})
console.log(test);

/**
 * path.isAbsolute(path)
 *  判断是否为绝对路径
 */
console.log(path.isAbsolute('/fo/bs'));
console.log(path.isAbsolute('fo/bs'));
console.log(path.isAbsolute('.'));

/**
 * path.join([...path])
 *  ...path 
 * 该方法会使用平台特有的分隔符来连接所有给定的path字段
 * 然后再规范化
 * 
 * 没有传入参数，则会被忽略
 */

console.log(path.join('/foo', 'bar', 'baz/asds', '/cd'));
console.log(path.join('/foo', 'bar', 'baz/asds', '../'));

/**
 * path.normalize(path)
 *  规范会给定的path，接受 '..' /'.' 字段
 */
console.log(path.normalize('/fooe/cd/..'))

/**
 * path.parse(path)
 *  return pathObject
 *      root
 *      dir
 *      base
 *      ext
 *      name
 */

test = path.parse('home/user/dir/file.txt');
console.log(test);

/**
 * path.posix
 *  提供对路径操作的方法
 */
console.log(path.posix);

/**
 * path.relative(from, to)
 *  给出要从from到to的相对路径
 */
console.log(path.relative('/home/user/dir/cd/ed', '/home/user/hah'));

/**
 * path.resolve([...paths])
 *  处理的过程是从右到左，直到遇到了绝对路径就会停止
 * 
 * 如果没有遇到决定路径 那么就会一直解析到全局的路径
 */
console.log(path.resolve('/foo', '/bar', 'baz')); // /bar/baz
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'));

/**
 * path.sep
 * 返回分隔符
 */
console.log(path.sep); // /