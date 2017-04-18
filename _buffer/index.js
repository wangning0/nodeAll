/**
 * 创建buffer method
 *
 * Buffer
 * 
 * 因为Buffer实例是用Buffer构造函数创建的，所以提供不同的参数创建不同的实例
 *      new Buffer(10)
 *      new Buffer('hello')
 *      new Buffer([1, 2, 3])
 * 
 * 因为根据不同的参数传递给new Buffer()会造成很大的区别，为了确保Buffer实例更加的可靠
 * 并且更少的错误，不提倡使用new Buffer()构造函数去实例化Buffer，而是更赞成使用
 *      Buffer.from(array) 返回一个新的buffer，包含八子节的副本
 *          Buffer.from(arrayBuffer[,byteOffset [, length]])
 *          Buffer.from(buffer)
 *          Buffer.from(string[, encoding])
 *          
 *      Buffer.alloc(size[, fill[, encoding]]) 性能没有allocUnsafe好，但是这个会确保没有老的数据存留
 *      Buffer.allocUnsafe(size) 
 * 的方式去构建
 * 
 * --zero-fill-buffers 选项 会自动的初始化填充0
 *  
 */

/**
 * Buffer 和 字符编码
 * 
 * Buffer实例被用于表示一系列的字符编码数据，如UTF-8 UC32 Base64 二进制等数据
 * 
 * 通过现实的编码格式来转化Buffer实例和JS原始的字符
 */

// const buf = Buffer.from('hello world');
// console.log( buf.toString('hex'));
// console.log(buf.toString('base64'));

/**
 * Buffer 实例可以用for...of...语法来进行迭代
 * 
 */

// const buf1 = Buffer.from([1, 2, 3]);

// for(const b of buf1) {
//     console.log(b);
// }

/**
 * Buffer.alloc(size[, fill [, encoding]])
 */
// const buf2 = Buffer.alloc(5, 1, 'utf-8');
// console.log(buf2);

/**
 * Buffer.allocUnsafe(size)
 */
// const buf3 = Buffer.allocUnsafe(10);
// console.log(buf3);
// buf3.fill(0);
// console.log(buf3);

/**
 * 要注意的就是Buffer模块预先分配一个内部的Buffer实例(大小为Buffer.poolSize)作为一个
 * Buffer.allocUnsafe()的数据分配池，如果size小于或者是接近poolSize那么就会分配一个Buffer.poolSize
 * 
 * Buffer.alloc(size, fill)不会用预先的分配池，而Buffer.allocUnsafe()会使用
 * 
 * 所以在某些时候需要提升性能的话 可以使用allocUnsafe()
 */

/**
 * Buffer.allocUnsafeSlow()是不在内部的预先分配池中去创建Buffer
 * 
 * 应该作为最好的手段去分配内存，
 */

/**
 * Buffer.byteLength(string[,encoding])
 *      encoding 默认为'utf8'
 */

/**
 * Buffer.compare(buf1, buf2)
 *      
 */

// const buf4 = Buffer.from('1234');
// const buf5 = Buffer.from('0123');
// console.log(Buffer.compare(buf4, buf5)); // 0表示相同 1表示不同


/**
 * Buffer.concat(list[,totalLength])
 *      list <Array> list of Buffer instances to concat
 *      totalLength 合并后的Buffer的总长度
 *      返回一个Buffer
 * 
 * 如果totlaLength没有提供的话，那么就要计算所有Buffer实例的长度，这个会造成一个新的
 * 循环去计算所有的长度，所以尽可能的去提供总长度
 */

// const buf6 = Buffer.alloc(10);
// const buf7 = Buffer.alloc(10);
// const buf8 = Buffer.alloc(10);
// const totalLength = buf6.length + buf7.length + buf8.length;

// console.log(totalLength);

// const bufA = Buffer.concat([buf6, buf7, buf8], totalLength);

// console.log(bufA, bufA.length);

/**
 * Buffer.isBuffer(obj)
 * 
 *  如果obj是一个Buffer， 返回true，否则返回false
 */

/**
 * Buffer.isEncoding(encoding)
 *  返回Buffer是否支持encoding这种编码
 */

/**
 * Property
 *  Buffer.poolSize 
 *  默认为8Btyes
 *  预先分配的neocon大小为内部的Buffer
 */

/**
 * buf.compare(target[,targetStart, [targetEnd[, sourceStart[, sourceEnd]]]])
 *  返回值 0表示相同
 *        1表示 target在buf的前面
 *        -1表示target在buf的后面 排序的时候
 */

// const buf1 = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// const buf2 = Buffer.from([5, 6, 7, 8, 9, 1, 2, 3, 4]);

// // Prints: 0
// console.log(buf1.compare(buf2, 5, 9, 0, 4));

/**
 * buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
 */

/**
 * buf.entries()
 *      
 */

/**
 * buf.equals(otherBuffer)
 */
// const buf1 = Buffer.from('ABC');
// const buf2 = Buffer.from('414243', 'hex');
// const buf3 = Buffer.from('ABCD');

// console.log(buf1.equals(buf2));
// buf2.equals(buf3);

/**
 * buf.fill(value[, offset[, end]][,encoding])
 */

// const b = Buffer.alloc(40).fill('h');
// console.log(b.toString());

/**
 * buf.includes(value[, byteOffset][, encoding])
 * 
 */
// const buf = Buffer.from('hello hi hey');
// console.log(buf.includes('hi'));
/**
 * buf.keys
 *  返会一个buf keys的迭代器
 */
// const buf = Buffer.from('buffer');
// for(const key of buf.keys()) {
//     console.log(key);
// }

/**
 * buf.lastIndexOf(value[, byteOffset][,encoding])
 */

/**
 * buf.length 
 * 返回为buf分配的内存字节大小，反馈的不是只用大小
 */
// const buf = Buffer.alloc(1234);
// console.log(buf.length);
// buf.write('some string', 0, 'ascii');
// console.log(buf.length);

/**
 * buf.slice[start[, end]]
 *  返回的新的Buffer和原来的内存地址相同，所以要注意修改
 */
// const buf1 = Buffer.allocUnsafe(26);
// for(let i = 0; i < 26; i++) {
//     buf1[i] = i + 97;
// }
// const buf2 = buf1.slice(0, 3);

// console.log(buf2.toString('ascii'));

// buf2[0] = 33;

// console.log(buf1.toString('ascii'));

/**
 * buf.toJSON()
 * 
 */

// const buf = Buffer.from([1, 2, 3]);
// const json = JSON.stringify(buf);
// console.log(json);

// console.log(JSON.parse(json));

/**
 * buf.toString([encoding[, start[, end]]])
 * 
 */

/**
 * buf.values()
 *  返回一个buf values的迭代器，当使用for...of时，会自动使用该函数
 */

const buf = Buffer.from('buffer');

for(const value of buf) {
    console.log(value);
}

/**
 * buf.write(string[,offset[, lngth]][, encoding])
 *  
 */

/**
 * buffer.kMaxLength
 *  一个Buffer实例允许的最大内存
 * 32位的机器是1GB
 * 64位的机器是2GB
 */
>>>>>>> 5b4698ca6937f2b98a048227486b148ac888c05d
