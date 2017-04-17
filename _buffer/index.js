/**
 * 创建buffer method
 */
// 1
let buf = new Buffer(10);
console.log(buf.toString());

// 2
buf = new Buffer([1, 2, 3]);
console.log(buf.toString());

// 3
buf = new Buffer('Buffer', 'utf-8');
console.log(buf.toString());