/**
 * @module _fs/index
 * @description 
 * @author
 */
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

function getDirInfo(basePath = './') {
    basePath = path.resolve(__dirname, basePath);
    const logPath = path.resolve(basePath, './info.log');
    try {
        fs.accessSync(basePath);
    } catch(err) {
        fs.mkdirSync(basePath);
    }
    (function getFileInfo(url) {
        const files = fs.readdirSync(url);
        console.log(files);
        _.each(files, (file) => {
            const filePath = path.resolve(url, file);
            if(fs.statSync(filePath).isDirectory()) {
                getFileInfo(filePath);
            } else {
                var out = fs.createReadStream(filePath, {
                    flags: 'r'
                });
                var inner = fs.createWriteStream(logPath, {
                    flags: 'a+'
                });
                out.pipe(inner);
                fs.writeFileSync(logPath, '\n\n\n', {
                    flags: 'a+'
                });
            }
        })
    })(basePath);
}


