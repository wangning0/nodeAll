/**
 * querystring 模块提供很多工具去解析和格式化URL查找字符串
 * 可以通过require('querystring)来获得该模块
 * 
 */

const querystring = require('querystring');

/**
 * querystring.escape(str)
 * 参数编码
 * 该方法是被querystring.stringify()使用的，通常来说不会直接使用
 */
console.log(querystring.escape('我是wing')); //%E6%88%91%E6%98%AFwing

/**
 * querystring.parse(str[,sep[,eq[, options]]])
 *      str 要解析的URL query string 默认为&
 *      sep 用于分割query string中键值对的子字符串
 *      eq  用来分隔key 和 value的子字符串
 *      options <Object>
 *          decodeURIComponent 解码函数 默认为querystring.unescape()
 *          maxKeys 默认的最大key数量
 */
console.log(querystring.parse('name=wing&age=10'));
console.log(querystring.parse('name:wing!age:10', '!', ':'));

/**
 * querystring.stringify(obj[,sep[,eq,[,options]]])
 *  
 */

console.log(querystring.stringify({ name: 'wing', age: '10' }, '&', '='));
console.log(querystring.stringify({ name: 'wing', age: '10' }, '!', ':'));

/**
 * querystring.unescape() 解码
 */