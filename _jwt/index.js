let jwt = require('jsonwebtoken');

var token = jwt.sign({ name: '张三' }, 'shhhhh');

console.log(token + '\n');

let decoded1=jwt.decode(token);

console.log(decoded1);


let decoded = jwt.verify(token, 'shhhhh');
console.log(decoded);
