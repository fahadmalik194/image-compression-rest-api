const express = require('express')
const router = new express.Router()
const compress = require('../functions/compress')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')

//Compress Image
router.post('/compress', upload.single('image'), (req, res) => {
    if(!req.body.rate || !req.file){
        return res.send({
            error: 'You must provide an image and comprassion rate'
        })
    }
    const compressionRate = parseInt(req.body.rate)
    if(compressionRate <= 0 || compressionRate > 100){
        return res.send({
            error: 'Compression rate must be in between (1-100)'
        })
    }
    compress.compressImage(req.file, compressionRate, (error, {compressedPath, targetPath} = {}) => {
        if(error){
            return res.send({
                error: error
            }) 
        }
        res.status(200).sendFile(compressedPath, () => {
            fs.unlinkSync(compressedPath)
            fs.unlinkSync(targetPath)
        })
    })
})

module.exports = router