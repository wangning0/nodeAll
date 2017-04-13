/**
 * 大多数Node.js的核心API围绕着异步事件驱动架构构建的
 * 
 * emitters 触发 listeners 监听的事件
 * 
 * 举例：
 *      net.Server 对象会触发一个事件每当有连接到达的时候
 *      fs.ReadStream触发一个事件每当文件打开的时候
 *      stream 触发一个事件只要数据可读
 */

 const EventEmitter = require('events');

 class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();

// myEmitter.on('event', () => {
//     console.log('file');
// })
// myEmitter.emit('event');

/**
 * 当一个普通的监听函数通过EventEmitter被调用时，this会被指向监听函数
 * 所依赖的EventEmitter
 */

// const myEmitter1 = new MyEmitter();
// myEmitter1.on('event', function(a,b) {
//     console.log(a, b, this);
// })
// myEmitter1.emit('event', 'a', 'b');

/**
 * 可以使用ES6的箭头函数解决这个问题
 * 
 */
// const myEmitter2 = new MyEmitter();
// myEmitter2.on('event', (a,b) => {
//     console.log(a, b, this);
// })
// myEmitter2.emit('event', 'a', 'b');

/**
 * 可以使用setImmediate() 或者是process.nextTick()来做异步的任务
 */

// const myEmitter3 = new MyEmitter();
// myEmitter3.on('event', (a, b) => {
//     setImmediate(() => {
//         console.log('async');
//     })
//     process.nextTick(() => {
//         console.log('cd');
//     })
// })
// myEmitter3.emit('event');

/**
 * eventEmitter.once() 方法，注册后，只会被触发一次，一旦触发了，
 * 就会移除
 */

/**
 * 当有 error 事件被触发时，如果EvenrEmitter没有一个事件监听error事件
 * 那么nodejs会打印出栈，并且进程退出
 */

/**
 * Class: EventEmitter
 * 
 * Event: 'newListener'
 *      eventName
 *      listener
 * 
 * 该事件会被触发在listener背添加到内部的监听函数集合中
 *      
 */

// const myEmitter = new MyEmitter();

// myEmitter.once('newListener', (event, listener) => {
//     if(event === 'event') {
//         myEmitter.on('event', () => {
//             console.log('B');
//         })
//     }
// })
// myEmitter.on('event', () => {
//     console.log('A');
// })

// myEmitter.emit('event');

/**
 * Event: 'removeListener'
 *  在listener被取消后触发
 */

/**
 * EventEmitter.defaultMaxListeners
 *      默认情况下，最大的监听函数是10个，可以通过emitter.setMaxListeners(n)方法
 *      去改变默认的数量
 */

/**
 * emitter.addListener(eventName, listener) 
 *  emitter.on()的别名
 */

/**
 * emitter.emit(eventName[, ...args])
 * 
 */

/**
 * emmiter.eventNames()
 *  返回event names 数组
 */
// const myEE = new EventEmitter();
// myEE.on('foo', () => {});
// myEE.on('bar', () => {});
// const sym = Symbol('symbol');
// myEE.on(sym, () => {});
// console.log(myEE.eventNames());

/**
 * emitter.getMaxListeners()
 * 
 */

/**
 * emitter.listenerCount(eventName)
 */

/**
 * emitter.listeners(eventName)
 */

/**
 * emitter.on(eventName, listener)
 */

/**
 * emitter.once(eventName, listener)
 *   只会触发一次，触发完了之后就会移除注册器
 */

/**
 * emmiter.removeAllListeners([eventName])
 *  移除所有的监听器，或者是绑定在eventName的事件处理器
 */