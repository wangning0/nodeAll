/**
 * String Decoder
 * 
 *  通过require('string_decoder')使用该模块，这个模块讲一个buffer解码成一个字符串，它是buffer.toString()的一个简单接口，提供对utf8的支持
 */

const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

const cent = new Buffer([0xC2, 0xA2]);
console.log(decoder.write(cent));

const euro = new Buffer([0xE2, 0x82, 0xAC]);
console.log(decoder.write(euro));

/**
 * StringDecoder类
 *  decoder.write(buffer)
 *  decoder.end()
 * 
 * 接受唯一一个参数 encoding 默认为 'utf8'
 */

/**
 * decoder.write(buffer)
 * 
 * 返回一个解码后的字符串
 */

/**
 * decoder.end()
 * 
 * 返回被留在缓存区中的任何末尾字节.
 */