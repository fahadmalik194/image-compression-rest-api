const fs = require('fs')
const express = require('express')
const router = new express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const resize = require('../functions/resize')

//Resize Image
router.post('/resize', upload.single('image'), (req, res) => {
    if (!req.body.width || !req.body.height || !req.file) {
        return res.send({
            error: 'You must provide an image, with its new width and height'
        })
    }
    const width = parseInt(req.body.width)
    const height = parseInt(req.body.height)
    resize.resizeImage(req.file, width, height, (error, {outputDir}) => {
        if(error){
            return res.send({
                error: error
            }) 
        }
        res.status(200).sendFile(outputDir, () => {
            fs.unlinkSync(outputDir)
        })
    })
})

module.exports = router