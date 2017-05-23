/**
 * OS 
 *  提供了一些基本的与操作系统相关的实用参数
 *  通过require('os')使用该模块
 */

/**
 * os.EOL 
 *  一个定义了操作系统相应的行尾(End-of-line)标识的常量
 * 
 * os.type()
 * 返回操作系统名称，Linux中返回‘Linux’ ，OSX返回‘Darwin’ Windows 返回的是'Windows_NT
 * 
 * os.release()
 * 返回操作系统版本
 * 
 * os.platform()
 * 返回操作系统平台
 * 
 * os.cpus()
 * 返回一个对象数组，包含所安装的每个CPU／内核的信息，型号，速度（MHZ）时间
 * 
 * os.arch()
 * 返回操作系统的CPU架构 'x64'，'arm' 和 'ia32'
 * 
 * os.endianness()
 * 返回CPU的字节序， 大端对齐还是小端对齐
 * 
 * os.loadavg()
 * 返回一个包含 1、5、15 分钟平均负载的数组。
 * 
 * os.totalmem()
 * 系统内存总量，字节为单位
 * 
 * os.freemem()
 * 返回可用的系统内存量，以字节为单位
 * os.uptime()
 *  返回操作系统的运行时间，以秒为单位
 * os.networkInterfaces()
 *  获取网络接口列表
 * os.hostname()
 *  返回操作系统的主机名
 * os.homedir()
 *  返回当前用户的主目录
 * os.tmpdir()
 *  返回操作系统默认的临时文件目录。
 */

const os = require('os');

// console.log(os.EOL);
// console.log(os.release());
// console.log(os.platform());
// // console.log(os.cpus());
// console.log(os.arch());
// console.log(os.endianness());
console.log(os.uptime());
// console.log(os.networkInterfaces());
console.log(os.hostname());
console.log(os.tmpdir());