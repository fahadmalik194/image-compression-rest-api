const express = require('express')
const resizeRouter = require('./routers/resize')
const compressRouter = require('./routers/compress')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(resizeRouter)
app.use(compressRouter)

app.listen(port, () => {
    console.log('Server is up and running on ' + port)
})