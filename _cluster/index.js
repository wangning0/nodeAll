/**
 * cluster 集群模块
 */

/**
 * Node的单个实例在单个线程中运行，为了利用多核的系统，用户有时候希望
 * 可以通过启动一个Node进程的集群来进行负载均衡
 * 
 * cluster模块可以使你非常轻松的创建共享服务器端口的子进程
 */

// const cluster = require('cluster');
// const http = require('http');
// const numCPUs = require('os').cpus().length;

// if(cluster.isMaster) {
//     console.log('master is starting');
//     for(let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on('listening', (worker, address) => {
//         console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
//     })

//     cluster.on('exit', (worker, code, signal) => {
//         console.log('worker ' + worker.process.pid + ' died', code, signal);
//     })
// } else {
//     http.createServer((req, res) => {
//         res.writeHead(200);
//         res.end('hello, world');
//     }).listen(0);
//     // listen(0) 表示的是随机一个端口号
// }
/**
 * 怎么工作的？
 *  
 *  worker processes是通过使用child_process.fork()派生出的，所以它们可以通过
 *  IPC与父进程通信，并且来回传递服务器句柄
 *  
 *  cluster 模块提供两种方式分发进入的请求
 * 
 *  第一种（也是默认的一种方式，除了windows），这是round-robin方法，主进程
 *  在端口上监听，接受新的连接，并以round-robin的循环方式分配给工作人员，从而避免工作进程的过载
 * 
 *  第二种 是主线程创建监听套接字，然后发送它到感兴趣的workers，然后这个worker直接接受进入的连接
 * 
 *  理论上来说，第二种方式有更好的性能体验，但是实际上，由于操作系统的调度变化莫测，从而导致
 *  不平衡的分配，根据观察，如果有8个进程，70%所有的连接都主要集中在两个进程
 * 
 */

/**
 * fork的含义
 *  fork通过复制调用进程来创建一个新的进程，新的进程被称为子进程，当前调用进程被称为父进程
 *  子进程和父进程运行在独立的内存空间，在fork()时，两个内存空间有相同的内容，由其中一个进程执行的内存写入，文件映射（mmap（2））和取消映射（munmap（2））不会影响另一个进程。
 */

/**
 * cluster的API
 *  
 *   cluster的各种属性和函数
 *      settings 配置集群参数对象
 *      isMaster 判断是否为master节点
 *      
 */

// const cluster = require('cluster');
// const http = require('http');
// const numCPUs = require('os').cpus().length;

// if(cluster.isMaster) {
//     console.log(`[master] start master...`);
//     for(var i = 0; i < numCPUs; i++) {
//         const wk = cluster.fork();
//         wk.send(`[master] hi worker ${wk.id}`);
//     }

//     cluster.on('fork', (worker) => {
//         console.log(`[master] fork: worker ${worker.id}`);
//     })

//     cluster.on('online', (worker) => {
//         console.log(`[master] online worker ${worker.id}`);
//     })

//     cluster.on('listening', (worker, address) => {
//         console.log(`[master] listening: worker ${worker.id}, pid: ${worker.process.pid}, address: ${address.address}`);
//     })

//     cluster.on('disconnect', (worker) => {
//         console.log(`[master] disconnect: worker ${worker.id}`);
//     })

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`[master] exit worker ${worker.id} died`);
//     })

//     function eachWorker(callback) {
//         for (var id in cluster.workers) {
//             callback(cluster.workers[id]);
//         }
//     }

//     setTimeout(function () {
//         eachWorker(function (worker) {
//             worker.send('[master] ' + 'send message to worker' + worker.id);
//         });
//     }, 3000);

//     Object.keys(cluster.workers).forEach(function(id) {
//         cluster.workers[id].on('message', function(msg){
//             console.log('[master] ' + 'message ' + msg);
//         });
//     });

// } else if(cluster.isWorker) {
//     console.log(`[worker] start worker ... ${cluster.worker.id}`);
    
//     process.on('message', msg => {
//         console.log(`[worker] ${msg}`);
//         process.send(`[worker] worker ${cluster.worker.id} received`);
//     })

//     http.createServer((req, res) => {
//         res.writeHead('200');
//         res.end('hello');
//     }).listen(3000);
// }

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster) {
    console.log('[master] master start...');
    for(let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('listening', (worker, address) => {
        console.log(`[master] listening worker ${worker.id} pid ${worker.process.id} Address: ${address.address} port ${address.port}`);
    })
} else if(cluster.isWorker) {
    console.log(`[worker] worker start ... ${cluster.worker.id}`);
    http.createServer((req, res) => {
        console.log(`worker ${cluster.worker.id}`);
        res.end(`worker ${cluster.worker.id} PID: ${process.pid}`);
    }).listen(3000);
}