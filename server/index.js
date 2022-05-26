const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connectToMongo = require('./database');
const bcrypt = require('bcryptjs');
const User = require('./models/user')
const cors = require('cors')
const jwt = require('jsonwebtoken')

connectToMongo()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors())

app.get("/", function (req, res) {
    res.send("hello world")
})

const JWT_SECRET = "This is for token formation."

app.listen(5000, () => console.log("server is up and running"))

app.post("/createUser", async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const securedPassword = bcrypt.hashSync(req.body.password, salt);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword
        })
        user.save((err) => {
            if (err) {
                return res.status(202).json({
                    title: "error",
                    error: "User Already Registered."
                })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            return res.status(200).json({
                title: "Sign Up Successfull.",
                token: authToken
            })
        })
    } catch (error) {
        res.send(error)
    }

})

app.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(202).json({ title: "Login Failed", error: "Login credentials not correct." })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(202).json({ title: "Login Failed", error: "Login credentials not correct." })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.status(200).json({
            title: "Log In Successfull.",
            token: authToken
        })
    } catch (error) {
        res.send(error)
    }
})