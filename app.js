const express = require("express");
const app = express();
let userRouter = require("./routes/users");
let authRouter = require("./routes/auth");
const models = require("./models/index");
const PORT = process.env.PORT;

app.use(express.json())

app.get('/health',async (req,res)=>{
    res.send("NODE PG IS RUNNING - HEALTH FINE");
})

app.use('/auth', authRouter)
app.use('/users', userRouter)

app.listen(PORT, () => { console.log("NODE PG Listening on Port ", PORT) })