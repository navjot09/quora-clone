const express = require('express')
const connectToMongo = require('./database');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
connectToMongo()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors())

app.get("/", function (req, res) {
    res.send("hello world")
})

app.listen(5000, () => console.log("server is up and running"))

app.use('/auth', require('./routes/auth'));
