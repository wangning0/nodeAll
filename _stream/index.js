/**
 * @module stream
 * @description stream of node
 * @author wing
 */

/**
 *  streams 的种类
 *   Readable
 *   Writbable
 *   Duplex
 *   Transform
 * 
 *  可读流和可写流都能保存data在内部的buffer里面，可以通过
 *  writable._writableState.getBuffer() 或者是 readable._readableState.buffer 获取
 * 
 * 
 *  highWaterMark 表示的是可以被buffer的数据量
 *  
 *  在可读流中，当调用stream.push(chunk)时，数据会被缓冲，如果流的消费者没有调用
 *  stream.read()，这个数据将会被进入内部的队列中直到他被消费，一旦内部的可读buffer到达了
 *  highWaterMark，流将会暂时的停止read数据直到里面的buffer被消费了，stream会停止调用
 *  内部的去填充read buffer的readable._read()方法
 * 
 *  在可写流中，当多次调用writable.write(chunk)方法时，数据会被buffer到可写流中，当内部的
 *  write buffer 是在highWaterMark内的话，那么会返回true，一旦超出了highWaterMark，那么
 *  会返回false
 * 
 *  stream api的目标，尤其是stream.pipe()方法，是去限制data的buffer在一个可以接受的级别，
 *  以至于在生产者和消费者速度不相等的情况下不会导致可用哦内存的溢出
 * 
 *  Duplex和Transform流是可读和可写的，他们维持两个独立的内部的buffer用于读和写，比如net.Socket
 *  实例就是Duplex流，Readable side允许通过socket获取data，Writable side允许通过socket写数据
 *  
 */

// API for Stream Consumers

const http = require('http');
const server = http.createServer((req, res) => {
    let body = '';
    const arr = [];
    req.setEncoding('utf-8');
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            res.write(typeof data);
            res.end();
        } catch(e) {
            res.statusCode = 400;
            return res.end(`error: ${e.messageyt}`);
        }
    })
})
server.listen(1337);

/**
 * Writable 流(比如上面的res)暴露了两个write() end()方法去用于写数据到stream
 * 
 * Readable 流用EventEmitter API 当有数据可以从流中读取时，通知应用程序
 * 可以通过多种方式从流中去获取数据
 * 
 * 通常来说，将数据写入或者读出从流中时不需要直接实现流的接口，也不需要调用require('stream')
 * 
 * 
 */


/**
 * Writable Streams
 *  是一种当数据被写入的时候的一种抽象
 *  
 * HTTP requests client
 * HTTP response server
 * fs wirte streams
 * zlib streams
 * crypto streams
 * TCP sockets
 * child process stdin
 * process.stdout process.stderr
 * 
 * 所有的可写流都是stream.Writable类的实例化,但是不同的实例在一定程序上有所区别
 * 但是所有的stream.Writable类的实例都有write() end()方法
 */

/**
 * class: stream.Wirtable
 * 
 * Event: close
 *      当流和任何的底层资源(fd)关闭时出触发.不是所有的Writable流都会触发
 * Event: drain
 *      如果调用stream.write(thunk)返回了false，当恢复写入数据时那么会触发drain
 * Event: error
 *      当在write data 或者pipint data时候出发了错误就会触发
 * Event: finish
 *      当stream.end()被调用后就会触发finish事件，所有的数据会被进入了底层系统
 *      const writer = getWritableStreamSomehow();
        for(let i = 0; i < 100; i++) {
            writer.write(`hello,${i}`);
        }
        writer.end('end');
        writer.on('finish', () => {
            console.error('completed');
        })
 * Event: pipe Arguments: <src::stream.Readable>
 *      当在readable stream中调用了stream.pipe()方法的时候会触发
 *      const writer = getWritableStreamSomehow();
        const reader = getReadableStreamSomehow();

        writer.on('pipe', (src) => {
            console.log('pipe');
        })
        reader.pipe(writer); 
 * Event: unpipe
 *      类似于pipe stream.unpipe()被触发
 * 
 */

/**
 * writable.cork()
 *      该方法强制将所有的written data写入到内存中，当stream.uncork()/stream.end()方法被调用时
 *      buffered data 才会被写入
 *      主要的作用是避免当很多小块数据写入流中，不会备份对性能造成影响
 * 
 * writable.end([chunk], [encoding], [callback])
 * 
 * writable.setDefaultEncoding(encoding)
 * 
 * writable.uncork()
 *      将stream.cork()被调用后buffed的数据写入，推荐在process.nextTick()中使用该方法
 *      stream.cork();
        stream.write('some ');
        stream.write('data ');
        process.nextTick(() => stream.uncork());
 *      多少个cork就要对应多少个uncork
 * 
 * writable.write(chunk, [encoding], [callback])
 *      写入数据到流中，要注意到是否buffer大小是否超过highWaterMark
 * 
 * 
 */

/**
 * Readable Streams
 * 
 * 数据被消费的抽象
 * 
 * Examples:
 * 
 *  HTTP response client
 *  HTTP request server
 *  fs read streams
 *  zlib streams
 *  crypto streams
 *  TCP sockets
 *  child process stdout stderr
 *  process.stdin
 * 
 * 所有的Readable流都是stream.Readable的实例
 * 
 * 两种状态
 *      流动 follow
 *      暂停 pause
 * 在流动状态中，data来自底层系统，并且EventEmitter实例会进可能的通知应用
 * 在暂停模式下，必须显示调用stream.read()方法来从流中读取数据块
 * 
 * 所有的Readable流都是从暂停状态开始的，可以通过以下方式切换成流动状态
 *      添加一个data事件处理器
 *      调用stream.resume()
 *      调用stream.pipe()方法发送数据到Writable
 *  
 * 从流动状态切换成暂停状态的方法：
 *      不是pipe的话，调用stream.pause()
 *      是pipe的话，调用stream.unpipe()
 * 
 * 
 * 要注意的是，如果当Readable被切换到了流动模式后，没有消费者去处理数据的话，这些数据将会
 * 丢失
 * 
 */

/**
 * class: stream.Readable
 * Event: close
 *      当流和底层资源被关闭后，触发的事件
 * Event: data
 *      无论何时，只要流将数据给了消费者，也就是只要流切换到了流动状态就会触发
 *      如果使用了readable.setEncoding()方法去定义了编码，那么回掉函数中的数据块
 *      会作为string，否则就是Buffer
 * Event: end
 *      只要data被完全的消费掉了就会触发
 * Event: error <Error>
 *      出错时会触发
 * Event: readable
 *      当有data可以从流中读取就会触发，在一些情况下，触发readable事件会造成一些数据读
 *      入道内部的buffer中，在end事件之间也会触发。
 *      const fs = require('fs');
        const rr = fs.createReadStream('foo.txt');
        rr.on('readabel', () => {
            console.log('readable: ', rr.read());
        })
        rr.on('end', () => {
            console.log('end');
        })
 *  
 */
/**
 * readable.isPaused()
 *      返回当前的Readable的状态
 *      const readable = new stream.Readable

        readable.isPaused() // === false
        readable.pause()
        readable.isPaused() // === true
        readable.resume()
        readable.isPaused() // === false
 * readable.pause()
 *      调用该方法会使流动状态切换到暂停状态，所有的可用数据都会保留在内部的buffer中
 * readable.pipe(destination[, options])
 *      writable stream => readable 流动的数据会自动的管理，以至于目标writable stream
 *      不会溢出
 *      const readable = getReadableStreamSomehow();
        const writable = fs.createWriteStream('file.txt');
        readable.pipe(writable);
 *      readable.pipe()可以链式调用
 * readable.read([size])
 *      改方法可以从内部的buffer获取数据，如果没有可获取的数据那么会返回null,默认会返回一个Buffer对象
 *      除非设置了readable.setEncoding()方法，该方法只有在暂停状态下才能被调用
 *      在流动状态下，会自动被调用
 * 
 * readable.resume()
 *      显示的调用，从pause=>flowing状态的切换
 * readable.setEncoding(encoding)
 *      为从Readable流中的数据设置默认的编码格式
 * readable.unpipe()
 * readable.unshift(chunk)
 */
const readable = getReabableStreamSomehow();
readable.on('data', (chunk) => {
    console.log(`chunk length is ${chunk.length}`);
    readable.pause();
    console.log('waiting...');
    setTimeout(() => {
        console.log('continue...');
        readable.resume();
    }, 1000)
})

const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream('file.txt');
readable.pipe(writable);