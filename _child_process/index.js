/**
 * child_process 模块提供一个能力去派生一个子进程
 * 主要的功能还是靠child_process.spawn()来提供
 */

/**
 * 父进程和子进程之间通过建立了stdin stdout和stderr的管道
 * child_process.spawn()方法异步派生子进程，没有阻塞Node的event loop
 * 也提供了同步的方法去派生子进程的方法child_process.spawnSync()
 */
/**
 * child_process方法提供了一系列同步和异步的方法
 *      child_process.exec() 派生一个shell并在该shell内执行命令，完成后stdout,stderr为参数
 *      child_process.execFile() 直接执行命令而不会派生一个shell
 *      child_process.fork() 派生一个新的Node进程，调用一个制定的模块，建立IPC通道允许父子进程之间的交流
 *      child_process.execSync() 
 *      child_process.execFileSync()
 */
/**
 * child_process.spawn（），child_process.fork（），child_process.exec（）和child_process.execFile（）
 * 方法都遵循典型的其他Node.js API的惯用异步编程模式
 * 每个方法都返回一个子进程实例，这些对象都可以调用EventEmitterAPI，允许父进程去注册监听函数去
 * 监听当在子进程的生命周期中发生相对应的事件
 * exec() execFile()方法还允许callback函数触发当子进程终止的时候
 */
// const spawn = require('child_process').spawn;
// const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

/**
 * child_process.exec(command[,options][,callback])
 *      command 执行的命令，空格分隔
 *      options
 *          cwd
 *          env
 *          encoding
 *          shell
 *          timeout
 *          maxBuffer
 *          killSignal default: SIGTERM
 *          uid
 *          gid
 *      callback    
 *          error
 *          stdout
 *          stderr
 * 
 * {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200*1024,
    killSignal: 'SIGTERM',
    cwd: null,
    env: null
}
    如果timeout大于0，父进程将发送由killSignal属性标识的信号(默认是SIGTERM)如果子进程运行时间超时
 */

// const exec = require('child_process').exec;
// exec('cat ./index.js', (err, stdout, stderr) => {
//     if(err) {
//         console.error(`${err}`);
//         return;
//     }
//     console.log(stdout);
//     console.log(stderr);
// })

/**
 * child_process.execFile(file[, args][, options][, callback])
 */
const execFile = require('child_process').execFile;
const child = execFile('node', ['--version'], (err, stdout, stderr) => {
    if(err) {
        console.error(err)
    }
    console.log(stdout);
    console.log(stderr);
})

/**
 * child_process.fork(modulePath[,args][,options])
 * 
 */