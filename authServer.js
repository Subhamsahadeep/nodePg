const jwt = require("jsonwebtoken")
const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json())

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_JWT_SECRET_KEY, {expiresIn : '15s'})
}

let refreshTokens = [];

app.post('/login',(req,res) => {
    const email = req.body.email
    const user = {email};
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_ACCESS_JWT_SECRET_KEY);
    refreshTokens.push(refreshToken)
    res.json({accessToken , refreshToken})

})

app.post('/token', (req,res) => {
     const refreshToken = req.body.token;
     if(!refreshToken) return res.sendStatus(401);
     if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
     jwt.verify(refreshToken, process.env.REFRESH_ACCESS_JWT_SECRET_KEY, (err, user) => {
         if(err) return res.sendStatus(403)
         const accessToken = generateAccessToken({email : user.email});
         res.json({accessToken : accessToken})

     })
})

app.delete('/logout', (req,res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    return res.sendStatus(204);
})


app.listen(PORT, () => { console.log("NODE PG Listening on Port ", PORT) })