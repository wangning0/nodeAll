# 异步I/O

[I/O 模型分享](./IO_share.pptx)

## Node的异步I/O

### 事件循环

Node自身的执行模型--事件循环

在进程启动时，Node便会创建一个类似于while(true)的循环，每执行一次循环体的过程称为Tick，每个Tick的过程就是查看是否有事件待处理，如果有，就取出事件及相关的毁掉函数，如果存在关联的回调函数则执行，然后进入下一个循环，如果不再有事件处理，就退出进程

在每个Tick的过程中，如何判断是否有事件需要处理呢？需要引入**观察者**的概念，每个事件循环中有一个或者多个观察者，而判断是否有事件要处理的过程就是向这些观察者询问是否有要处理的事件

![event_loop](./image/event_loop.png)

事件循环是一个典型的生产者／消费者模型。异步I/O、网络请求等则是事件的生产者，源源不断为Node提供不同类型的事件，这些事件被传递到对应的观察者那里，事件循环则从观察者那里取出事件并处理


从JavaScript调用Node的核心模块，核心模块调用C++内建模块，内建模块通过libuv进行系统调用，这是Node里经典的调用方式，由JavaScript层面发起的异步调用的第一阶段就结束。JavaScript线程可以继续执行当前任务的后续操作，当前的I／O操作在线程池中等待执行，不管它是否阻塞I/O,都不会影响到JS线程的后续执行，从而达到了异步的目的

请求对象时异步I/O过程中的重要中间产物，所有的状态都保存在这个对象中，包括送入线程池等待执行以及I／O操作完毕后的回调处理

组装好请求对象、送入I／O线程池等待执行，实际上完成了异步I/O的第一部分，回调通知是第二部分。

![aio](./image/aio.png)

### 非I/O的异步API

* setTimeout
* setInterval

    上面两个与浏览器中的API是一致的，分别用于单次和多次定时执行任务，他们的实现原理与异步I/O比较类似，只是不需要I／O线程池的参与，调用两者创建的定时器会被插入到定时器观察者内部的一个红黑树中，每次Tick执行时，会从该红黑树中迭代取去定时器对象，检查是否超过定时时间，如果超过，就形成一个事件，它的回调函数将立即执行，而setInterval则是重复性的检测和执行，定时器的问题是非精确的。
    
    ![setTimeout](./image/setTimeout.png)
    
* setImmediate

    process.nextTick() > setImmediate() 因为在于事件循环对观察者的检查是有先后顺序的，process.nextTick()属于idle观察者，setImmediate()属于check观察者，在每一个轮循环检查中，idle观察者 > I/O观察者，I／O观察者先于check观察者
    
* process.nextTick

    每次调用`process.nextTick()`方法，只会将回调函数放入队列中，在下一轮Tick时取出执行，定时器中采用红黑树的操作时间复杂度为O(lg(n)),nextTick()是O（1）
    

具体实现上，process.nextTick()的回调函数保存在一个数组中，setImmediate()的结果保存在链表中，在行为上，process.nextTick()在每轮的循环中将数组中的回调函数全部执行完，而setImmediate()在每轮循环中执行链表中的一个回调函数

```
process.nextTick(function () {
    console.log('nextTick延迟执行1');
});
process.nextTick(function () { 
    console.log('nextTick延迟执行2');
});
// 加入两个setImmediate()的回调函数
setImmediate(function () {
    console.log('setImmediate延迟执行1'); 
    // 进入下次循环 
    process.nextTick(function () {
        console.log('强势插入');
    });
});
setImmediate(function () {
    console.log('setImmediate延迟执行2'); 
});

console.log('正常执行');
```

老版本的Node会优先执行process.nextTick。 
当process.nextTick队列执行完后再执行一个setImmediate任务。然后再次回到新的事件循环。所以执行完第一个setImmediate后，队列里只剩下第一个setImmediate里的process.nextTick和第二个setImmediate。所以process.nextTick会先执行。

而在新版的Node中，process.nextTick执行完后，会循环遍历setImmediate，将setImmediate都执行完毕后再跳出循环。所以两个setImmediate执行完后队列里只剩下第一个setImmediate里的process.nextTick。最后输出”强势插入”。

**观察者优先级**

在每次轮训检查中，各观察者的优先级分别是：

idle观察者 > I/O观察者 > check观察者。

idle观察者：process.nextTick

I/O观察者：一般性的I/O回调，如网络，文件，数据库I/O等

check观察者：setImmediate，setTimeout

## 异步编程

## 函数式编程

**高阶函数**

高阶函数则是可以把函数作为参数，或是将函数作为返回值的函数

**偏函数用法**

偏函数用法是指创建一个调用另外一个部分--参数或变量已经预置的函数--的用法
    
```
var toString = Object.prototype.toString;
var isType = function() {
    return function(obj) {
        return toString.call(obj) == '[object ' + type + ']';
    }
}
```
## 异步编程的优势和难点

**异常处理**

Node在处理异常上形成了一种约定，将异常作为回调函数的第一个实参传回，如果是空值，则表示异步调用没有异常抛出

**函数嵌套过深**

有时候，数据、模版、资源文件，这三者之间互相依赖，从而导致了函数嵌套过深

**阻塞代码**

对于进入JS世界不久的开发者，没有类似于sleep()这样的线程沉睡功能，唯独能用于延时的操作只有setInterval、setTimeout()这两个函数，但是不能阻塞后面的代码的持续执行

如果使用时间阻塞的方式去做，会持续占用CPI进行判断，与真正的线程沉睡相差甚远，因为Node单线程，CPU的资源全部都会用于为这段代码服务，导致其余请求都不会得到响应

使用setTimeout会更好

**多线程编程**


因为Node是单线程，所以很难利用现在多核的特点。浏览器提出了web workerer的思想，是一个利用消息机制合理使用多核CPU的理想模型。

Node借鉴了这个模式，`child_process`使其基础API，`cluster`模块是更深层次的应用

## 异步编程解决方案

* 事件发布／订阅模式
* Promise/Deferred模式
* 流程控制库

## 异步并发控制

**bagpipe的解决方案**
 
* 通过一个队列来控制并发量
* 如果当前活跃（指调用发起但未执行回调）的异步调用量小于限定值，从队列中取出执行
* 如果活跃调用大道限定值，调用暂时存放在队列中
* 每个异步调用结束时，从队列中取出新的异步调用执行
       
[bagpipe](./bagpipe.js)
****







