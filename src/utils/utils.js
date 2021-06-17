const fs = require('fs')

function GetFilename(path) {
    if (path) {
        var m = path.toString().match(/.*\/(.+?)\./);
        if (m && m.length > 1) {
            return m[1];
        }
    }
    return "";
}

function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

function saveImagetoPath(tempPath, targetPath, callback){
    fs.rename(tempPath, targetPath, err => {
        if (err){
            callback(false)
        }
        callback(true)
      });
}

module.exports = {
    GetFilename,
    toArrayBuffer,
    saveImagetoPath
}