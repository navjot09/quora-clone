const jwt = require('jsonwebtoken');

const JWT_SECRET = "This is for token formation."

const verifyUser = (req, res, next) =>{
    const token = req.header('token');
    if(!token){
        return res.status(401).send({error: "Invalid Authentication."})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({error: "Invalid Authentication."})
    }
}

module.exports = verifyUser;