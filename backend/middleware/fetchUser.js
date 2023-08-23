const jwt = require('jsonwebtoken');
const JWT_SECRET = "Gyana$ranjan$sahoo"

const fetchuser = (req, res, next) => {
    // get the user from the  jwt token and add id to required object
    const token = req.header("auth-token");
    if(!token) {
        res.status(401).send({error: "Invalid token"})
    }
    try {
        const data  = jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next();
    } catch (error) {
        res.send(401)
    }
}


module.exports = fetchuser