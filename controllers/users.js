const models = require("../models/index");

const getAllUsers = async(req, res) => {
    try{
        let response = await models.users.findAll({
            raw: true
        })
        res.status(200).send({
            success : true,
            data : response
        });
    }catch(e){
        res.status(500).send({
            success : false,
            message : e.message
        });
    }
}

module.exports = {
    getAllUsers
}