const fs = require('fs')
const sharp = require('sharp')
const path = require('path')

const resizeImage = (image, width, height, callback) => {
    const outputDir = path.join(__dirname, '../compressImages/' + image.originalname)
    const imgBuffer = fs.readFileSync(Buffer.from(image.path))
    sharp(imgBuffer)
        .resize(width, height)
        .toFile(outputDir, function (err) {
            if (err) {
                callback('Unable to resize image', undefined)
            } else {
                if (image.path && outputDir) {
                    fs.unlinkSync(image.path)
                    callback(undefined, {outputDir})
                }
            }
        })
}

module.exports = {
    resizeImage
}