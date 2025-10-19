const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken');

module.exports.registerUser = async (req, res)=>{
    try {
        let {fullname, email, password} = req.body; 

        let user = await userModel.findOne({email});
        if(user){
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/");
        }else{
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    if(err) return res.send(err.message);
                    user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });

                    let token = generateToken(user);
                    res.cookie('token', token);
                    res.send(user);
                });
            });
        }
    } catch (error) {
        // res.send(error.message);   
        req.flash("error", error.message);
        return res.redirect("/");
    };
}

module.exports.loginUser = async (req, res)=>{
    try {
        let {email, password} = req.body;
    
        let user = await userModel.findOne({email});
        if(!user){
            // return res.send('Username or password is invalid');
            req.flash("error", "Username or password is invalid");
            return res.redirect("/");
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if(!result){
                // return res.send('Username or password is invalid');
                req.flash("error", "Username or password is invalid");
                return res.redirect("/");
            }   
            let token = (generateToken(user));
            res.cookie('token', token);
            res.redirect('/shop');
        });  
    } catch (error) {
        // res.send(error.message);        
        req.flash("error", error.message);
        return res.redirect("/");
    }    
}

module.exports.logOut = async (req, res)=>{
    res.cookie("token", "");
    res.redirect("/");
};