const jwt = require("jsonwebtoken");
const models = require("../models/index");

const loginUser = async(req, res) => {
    try{
        const userEmail = req.user.email;
        console.log("email :",req.user.email)
        let response = await models.users.findOne({
            where : {
                email : userEmail
            },
            raw: true
        })
        if(response && response.id){
            res.status(200).send({
                success : true,
                data : response
            });
        }else{
            res.status(400).send({
                success : false,
                message : "user details are invalid"
            });
        }
    }catch(e){
        res.status(500).send({
            success : false,
            message : e.message
        });
    }
}

const generateToken = async(req,res) => {
    // Validate User Here
    // Then generate JWT Token
    try{
        const ACCESS_JWT_SECRET_KEY = process.env.ACCESS_JWT_SECRET_KEY;
        const user = {
            email : req.body.email
        }
      
        const accessToken = jwt.sign(user, ACCESS_JWT_SECRET_KEY);
      
        res.status(200).send({
            success: true,
            accessToken : accessToken
        });
    }catch(e){
        res.status(500).send({
            success: false,
            message : e.message
        });
    }
}


module.exports = {
    generateToken,
    loginUser
}