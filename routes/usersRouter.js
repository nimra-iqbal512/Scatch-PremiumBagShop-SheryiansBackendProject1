const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken');

router.get('/', (req, res) => {
    res.send('Hi for user');
});

router.post('/register', async (req, res)=>{
    // Agr user khali form submit kr dy, ya suppose koi field like email ya password missing ho, to mongodb tb b user create kr dy ga.
    // But hmy user create nahi krwana, jb tk sary fields filled na ho.. So for this, we use 'joy' package. It does not allow us to create user untill all fields are not filled.
    try {
        let {fullname, email, password} = req.body; 

        let user = await userModel.findOne({email});
        if(user){
            return res.send('This email is already taken');
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
        res.send(error.message);   
    };
});

module.exports = router;