/**
 * Crypto模块
 * 
 * 该模块提供加密的功能包括 OpenSSL的hash HMAC 加密 解密 签名和验证功能的包装器
 * 
 */

// const crypto = require('crypto');

// const secret = 'wangning';
// const hash = crypto.createHmac('sha256', secret)
//             .update('I love shiran')
//             .digest('hex');
// console.log(hash);

// 在使用该模块之前，要确保该模块是否在当前的node版本支持

// let crypto;
// try {
//     crypto = require('crypto');
// } catch (err) {
//     console.log(`crypto模块不支持`);
// }

// SPKAC是Netscape 最初实现的证书签名请求机制并且现在正式指定为H5的keygen元素的一部分
// crypto模块提供了Certificate类用于处理SPKAC数据。最常用的方法就是处理H5 <keygen>元素的输出,Node内部使用OpenSSL的SPKAC来实现


//Certificate 类的实例可以通过使用new关键词或调用crypto.Certificate()函数来创建

// const cert1 = new crypto.Certificate();
// const cert2 = crypto.Certificate();

/**
 * certificate.exportPublicKey(spkac)
 *  spkac 数据结构包括公钥和挑战（ public key and a challenge )
 *  以Nodejs的Buffer形式返回公钥组件，spkac参数可以是字符串也可以是Buffer
 */

/**
 *  const cert = require('crypto').Certificate();
    const spkac = getSpkacSomehow();
    const publicKey = cert.exportPublicKey(spkac);
    console.log(publicKey);
    // Prints the public key as <Buffer ...>
 */

/**
 * certificate.exportChallenge(spkac)
 *  spkac 数据结构包括公钥和咨询。certificate.exportChallenge() 以 Node.js 的 Buffer 形式返回公钥组件。spkac 参数既可以是字符串也可以是 Buffer。
 */

/**
 *  const cert = require('crypto').Certificate();
    const spkac = getSpkacSomehow();
    const challenge = cert.exportChallenge(spkac);
    console.log(challenge.toString('utf8'));
    // Prints the challenge as a UTF8 string
 */

/**
 * certificate.verifySpkac(spkac)
 *      验证给定的spkac数据结构是否有效, spkac必须是Node的Buffer形式
 */

/**
 * Class: Cipher
 *  Cipher类的实例用于加密数据,该类可以以两种方式进行使用：
 *      1. 作为可读可写的流, 写入简单的未加密数据并在可读端上和产生加密数据
 *      2. 使用cipher.update()和cipher.final()方法来产生加密数据
 * 
 * crypto.cretaeCipher() 
 * crypto.createCipheriv() 方法用于创建Cipher实例，Cipher对象无法直接使用new关键字创建
 */

// 将Cipher 对象用作流
// const crypto = require('crypto');
// const cipher = crypto.createCipher('aes192', 'a password');

// let encrypted = '';
// cipher.on('readable', () => {
//     const data = cipher.read();
//     if(data) {
//         encrypted += data.toString('hex');
//     }
// })

// cipher.on('end', () => {
//     console.log(encrypted);
// })

// cipher.write('some clear text data');
// cipher.end();

// 使用Cipher 并导流

// const crypto = require('crypto');
// const fs = require('fs');
// const cipher = crypto.createCipher('aes192', 'a password');

// const input = fs.createReadStream('./index.js');
// const output = fs.createWriteStream('./test.log');

// input.pipe(cipher).pipe(output);

// 使用update和final方法
// const crypto = require('crypto');
// const cipher = crypto.createCipher('aes192', 'a password');

// let encrypted = cipher.update('some text data', 'utf8');
// encrypted += cipher.final('hex');

// console.log(encrypted);


/**
 * Decipher类
 *  Decipher 类的实例用于解密数据。两种方式使用
 *      1. 作为可读和可写的流，写入简单的加密数据，并在可读端上产生未加密数据
 *      2. 使用decipher.update() decipher.final() 方法来产生加密数据
 * 
 * 创建Decipher实例的方法,无法直接使用new关键词创建
 *      1.crypto.createDecipher()
 *      2.crypto.createDecipheriv()
 * 
 */

// const crypto = require('crypto');
// const decipher = crypto.createDecipher('aes192', 'a password');

// let decrypted = '';
// decipher.on('readable', () => {
//     const data = decipher.read();
//     if(data) {
//         decrypted += data.toString('utf8');
//     }
// })

// decipher.on('end', () => {
//     console.log(decrypted);
// })

// const encrypted = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
// decipher.write(encrypted, 'hex');
// decipher.end();

// // 使用 Decipher 并导流
// const crypto = require('crypto');
// const fs = require('fs');
// const decipher = crypto.createDecipher('aes192', 'a password');

// const input = fs.createReadStream('test.enc');
// const output = fs.createWriteStream('test.js');

// input.pipe(decipher).pipe(output);

// 使用 decipher.update() 和 decipher.final() 方法

// const crypto = require('crypto');
// const decipher = crypto.createDecipher('aes192', 'a password');

// var encrypted = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
// var decrypted = decipher.update(encrypted, 'hex', 'utf8');
// decrypted += decipher.final('utf8');
// console.log(decrypted);

/**
 * DiffieHellman 类
 * 
 * 该类是一个用于创建 Diffie-Hellman密钥交换的工具类
 */


/**
 * Hash类
 * 
 * 该类是用处于创建数据散列摘要的工具类，可以通过以下两种方式之一使用
 *      1. 作为可读可写的流，写入数据并在可读端产生计算后的散列摘要
 *      2. 使用hash.update() 和 hash.digest 产生计算后的散列
 * 
 *  crypto.createHash()方法用于创建Hash实例，Hash对象无法直接使用new关键词创建
 * 
 */

// 将Hash对象用作流

// const crypto = require('crypto');
// const hash = crypto.createHash('sha256');

// hash.on('readable', () => {
//     const data = hash.read();
//     if(data) {
//         console.log(data.toString('hex'));
//     }
// })

// hash.write('some data to hash');
// hash.end();

// 使用Hash并导流

// const crypto = require('crypto');
// const hash = crypto.createHash('sha256');
// const fs = require('fs');

// const input = fs.createReadStream('./index.js');
// input.pipe(hash).pipe(process.stdout);

// 使用 hash.update() 和 hash.digest() 方法：
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

hash.update('some data to hash');
console.log(hash.digest('hex'));

/**
 * hash.update(data[,input_encoding])
 *  使用给定的data更新hash内容，给出的input_encoding 编码，可以是'utf8'/'ascii'/'binary'
 *  如果没有提供，data又是字符串，就强制使用'binary‘编码，如果data是一个Buffer，input_encoding会被忽略
 */

/**
 * hash.digest([encoding])
 * 计算所有传入的数据的散列摘要（使用hash.update()方法）encoding可以是
 * hex  binary  base64，如果提供了encoding会返回一个字符串，否则返回一个Buffer
 */


/**
 * Hmac
 * 
 * Hmac 类是用于创建加密的 HMAC 摘要的工具类。它可以以两种方式之一使用：

    作为可读和可写的流，写入数据并在可读端产生计算后的 HMAC 摘要。

    使用 hmac.update() 和 hmac.digest() 产生计算后的 HMAC 摘要
 */


/**
 * 
 * Sign类
 * 
 * Sign 类是用于生成签名的工具类。它可以以两种方式之一使用：

    作为一个可写流，写入要签名的数据，sign.sign() 用于生成和返回签名。

    使用 sign.update() 和 sign.sign() 方法来产生签名。

    crypto.createSign() 方法用于创建 Sign 实例。Sign 对象无法直接使用 new 关键词创建
 */


/**
 * Verify
 * 
 *  Verify 类是用于验证签名的工具类。它可以以两种方式之一使用：

    作为一个可写流，写入数据用于根据所提供的签名进行验证。

    使用 verify.update() 和 verify.verify() 方法来验证签名。

 */