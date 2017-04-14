/**
 * net模块提供一个异步网络库的封装，
 * 它所含有的方法可以创建客户端和服务端
 * 通过require('net')来引入该模块
 */
const net = require('net');
/**
 * Class: net.Server
 * 用于创建一个TCP或者本地的服务
 * net.Server 是一个EventEmitter 有着下面的方法
 */

/**
 * Event close
 *      当服务关闭的时候会触发，要注意的是所有的连接都关闭了才会触发这个事件
 * 
 * Event: 'connection'
 *      <net.Socket>
 *      当有新的连接时，会触发 ,socket是net.Socket的实例
 * Event: 'error'
 *      <Error>
 *      当发生了error时，会触发
 * Event: 'listening'
 *      当调用了server.listen时会触发
 * */

/**
 * server.address()
 *      返回绑定的地址的address,address family(IPV4,IPV6) port 
 * 
 */
const server = net.createServer((socket) => {
    socket.end('good bye\n');
}).on('error', (err) => {
    throw err;
})

server.listen(() => {
    console.log(server.address());
})

/**
 * server.close([callback])
 *  停止server接受新的连接，并且保持现有的连接，当所有的连接都结束的时候
 * 就会触发一个close event, callback会再触发close事件时触发，
 * 没开启服务时关闭了的话，callback会把error作为第一个参数
 * 
 */

/**
 * server.getConnections(callback)
 *  异步获取所有的以连接数，callback(err, count)
 */

/**
 * server.listen(handle[, backlog][,callback])
 * 
 */

/**
 * server.listen(options[, callback])
 *  options
 *      port
 *      host
 *      backlog
 *      path
 *      exclusive  boolean 
 *  callback
 * 
 * 如果exclusive默认为false，那么集群就会使用相同的底层资源
 * 允许共享连接处理任务
 * 
 */

/**
 * server.listen(path[, backlog][,callback])
 * path
 * backlog
 * callback
 * 
 * 方法是异步的 
 */

/**
 * server.listen([port][,hostname][,backlog][,callback])
 * 接受连接在被指定的端口号和主机名上，如果主机名被忽略了，那么默认
 * 使用IPv6的地址(::)如果IPv6无法使用，就使用IPv4(0:0:0:0)
 * 
 */

/**
 * server.listening
 *  返回server是否有连接
 */

/**
 * server.maxConnections
 * 设置最大的连接数,一旦socket被送去了child_process.fork()。不推荐使用
 * 
 */

/**
 * Class: net.Socket
 * 
 * 该对象是TCP或者一个本地的socket的抽象，net.Socket实例实现了duplex
 * 流的实例，可以被创造通过用户，或者是作为一个客户端(connect),或者
 * 通过NodeJs，通过server的connection事件传递给用户
 */

/**
 * new net.Socket([options])
 * 构建一个新的socket对象
 * options默认的对象为
 * {
        fd: null,
        allowHalfOpen: false,
        readable: false,
        writable: false
    }

    PS: halfOpen 指的是如果客户主机掉线（网线断开）、
    电源掉电、或系统崩溃，服务器进程将永远不会知道
    （通过我们常用的select，epoll监测不到断开或错误事件），
    如果不主动处理或重启系统的话对于服务端来说会一直维持着这个连接，
    任凭服务端进程如何望穿秋水，也永远再等不到客户端的任何回应。
    这种情况就是半开连接，浪费了服务器端可用的文件描述符。
 *  
 */

/**
 * Event: 'close'
 *      had_error boolean 如果有错误为true
 * 一旦socket被关闭了，had_error 将会告诉我们是不是因为这个socket被
 * 异常错误所关闭了
 */

/**
 * Event: 'connect'
 *      当一个连接成功建立了，会触发该事件
 */

/**
 * Event: 'data'
 *  当收到data时候会触发该事件，参数data可能是Buffer/String，可以通过
 * socket.setEncoding()来设置编码，如果没有data Event那么数据将会丢失
 */

/**
 * Event: 'drain'
 *  当write buffer变空了，那么会触发该事件，可以用于限制上传
 */

/**
 * Event: 'end'
 *  当另一个socket发送了FIN包的时候会触发该事件
 * 
 */

/**
 * Event: 'error'
 *  当error发生时，close event也会马上调用
 */

/**
 * Event: 'timeout'
 *  当连接超时没有响应的话，会触发该事件，为了通知socket是闲置的，可以关闭这个连接了
 * 
 */

/**
 * socket.address()
 *  返回绑定的socket地址
 */

/**
 * socket.bufferSize
 * 
 * net.Socket有一直可以工作的socket.write()属性
 * 能够帮助用户快速上手，电脑不能总是保持大量的数据被写入到socket中
 * 因为网络的连接是非常慢的，Node将内部写入套接字的数据进行排队，并在
 * 可能的情况下将其发送出去
 * 
 * 内部的缓冲造成的结构就是内存的增长，所以这个属性就是展示当前被缓冲
 * 的字符数
 */

/**
 * socket.bytesRead
 *  收到的字节的数量
 */

/**
 * socket.bytesWritten
 *  发送的字节数
 */

/**
 * socket.connect(options[,conncetListener])
 * 开启一个连接给被给定的socket
 * 对于TCP socket options参数应该是一个对象
 *      port 连接的client port
 *      host client连接的主机名 默认是localhost
 *      localAddress 
 *      localPort
 *      family
 *      hints
 *      lookup
 */

/**
 * socket.connect(path[, connectListener])
 * socket.connect(port[,host][,connectListener])
 */

/**
 * socket.connecting
 * true 表示socket.connect()已经被调用了，并且还没有结束
 * false的话，在触发connect事件或者soclek.connect()之前
 */

/**
 * socket.destroy([exception])
 *  确保没有更多的I/O活动发生在这个socket，只有errors的时候才有必要
 * 
 */

/**
 * socket.destroyed
 *  boolean
 */

/**
 * socket.end([data][,encoding])
 *  半关闭socket，发送一个FIN包，有可能server还在发送数据
 *  如果data存在的话，等同于先触发socket.write(data, encoding)
 *  再触发socket.end()
 */

/**
 * socket.localAddress
 * 代表本地的IP地址
 */

/**
 * socket.localPort
 */

/**
 * socket.pause()
 *  暂停读取数据
 */

/**
 * socket.resume()
 *  继续读取数据
 */

/**
 * socket.setEncoding
 */

/**
 * socket.setKeepAlive([enable][,initialDelay])
 * 开启／关闭 keep-alive功能
 */

/**
 * socket.setTimeout(timeout[, callback])
 * 闲置的最长时间
 */

/**
 * socket.write(data[, encoding][, callback])
 *  通过socket发送数据
 * 返回true表示写入了内存 ，返回false如果在内存中排队，并且drain时间也会被处罚
 */

/**
 * net.connect(options[,connectListener])
 */
const client = net.connect({
    port: 8124
}, () => {
    console.log('connect');
});

client.on('data', (data) => {
    console.log(data.toString());
    client.end();
})
client.on('end', () => {
    console.log('disconnected from server');
})

// const client = net.connect({
//     "path": "/tmp/echo.sock"
// })

/**
 * net.connect(path[, connectListener])
 */

// const client1 = net.connect("/tmp/echo.sock", () => {

// })

/**
 * net.connect(port[, host][, connectListener])
 */

/**
 * net.createConnection(optiosn[,conncetListener])
 *  工厂函数，返回一个新的net.Socket，并且自动的连接到提供的
 * options上
 */

/**
 * net.createConnection(path[, connectListener])
 */

/**
 * net.createConnection(port[, host][, connectListener])
 */

/**
 * net.isIPv4(input)
 */

/**
 * net.isIPv6(input)
 */