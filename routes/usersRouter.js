const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');

router.get('/', (req, res) => {
    res.send('Hi for user');
});

router.post('/register', async (req, res)=>{
    // Agr user khali form submit kr dy, ya suppose koi field like email ya password missing ho, to mongodb tb b user create kr dy ga.
    // But hmy user create nahi krwana, jb tk sary fields filled na ho.. So for this, we use 'joy' package. It does not allow us to create user untill all fields are not filled.
    try {
        let {fullname, email, password} = req.body; 
        let user = await userModel.create({
            fullname,
            email,
            password
        });
        res.send(user);
    } catch (error) {
        res.send(error.message);   
    };
});

module.exports = router;