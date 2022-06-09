const express = require('express')
const connectToMongo = require('./database');
const cors = require('cors')
const bodyParser = require('body-parser')
const Question = require('./models/question.js')
const Answer = require('./models/answer')
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
app.use('/posts', require('./routes/posts'));
app.use('/votes', require('./routes/votes'));