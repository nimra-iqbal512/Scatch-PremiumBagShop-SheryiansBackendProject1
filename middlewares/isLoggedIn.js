const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function(req, res, next){
    if(!req.cookies.token){
        req.flash("error", "you need to login first");
        return res.redirect('/');   //Message be create kr liya, or kisi route py redirect b ho gaye, or redirected route py hum iska data b access kr skty hain
    }
    
    try {
        let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        // console.log(decode);
        
        let user = await userModel
        .findOne({email: decode.email})
        .select("-password");   //pora user aa jaye ga, lekin uska password nahi ae ga
        // console.log(user);
        
        req.user = user;
        next();
    } catch (error) {
        req.flash("error", "Something went wrong");
        return res.redirect('/');
    }
}