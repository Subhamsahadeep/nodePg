const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    const ACCESS_JWT_SECRET_KEY = process.env.ACCESS_JWT_SECRET_KEY;

    jwt.verify(token,ACCESS_JWT_SECRET_KEY, (err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

module.exports = {
    authenticateToken
}