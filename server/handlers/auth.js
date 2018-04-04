const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = function() {};

exports.signup = async function(req, res, next) {
    try {


        //create user
        let user = await db.User.create(req.body);
        let { id, username, profileImageUrl } = user
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });


        //create token (signing token)
            //process.env.SECRET_KEY
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });


    } catch(err) {
        //see which error (11000 is fail)
        //if certain error
        //respond with user/email taken
        if(err.code === 11000){
            err.message = "Sorry, that username and/or email is taken"
        }
        
        //else send generic 400 (bad request)
        return next({
            status: 400,
            message: err.message
        });
    }
};