const fs = require('fs')
const path = require('path')
const { compress } = require('compress-images/promise')
const utils = require('../utils/utils')

const compressImage = (image, compressRate, callback) => {
    const outputDir = path.join(__dirname, '../compressImages/')

    const imgName = image.originalname
    const imgExtension = imgName.replace(/^.*\./, '');

    const tempPath = image.path
    const targetPath = path.join(__dirname, '../uploads/image.' + imgExtension)
    const compressedPath = path.join(__dirname, '../compressImages/image.' + imgExtension)

    utils.saveImagetoPath(tempPath, targetPath, (result) => {
        if (result) {
            const processImages = async (onProgress) => {
                const result = await compress({
                    source: targetPath,
                    destination: outputDir,
                    onProgress,
                    enginesSetup: {
                        jpg: { engine: 'mozjpeg', command: ['-quality', compressRate] },
                        png: { engine: 'pngquant', command: ['--quality=' + compressRate, '-o'] },
                    }
                }).then((result) => {
                    if (result.statistics[0].percent >= 95) {
                        compressRate += 2
                        fs.unlinkSync(result.statistics[0].path_out_new)
                        processImages()
                    } else {
                        callback(undefined, { compressedPath, targetPath})
                    }
                }).catch((e) => {
                    callback('Unable to compress image', undefined)
                })
            };
            processImages()
        } else {
            callback('Unable to upload image', undefined)
        }
    })
}

module.exports = {
    compressImage
}