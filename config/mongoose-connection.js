const mongoose = require('mongoose');
const config = require('config');

const dbgr = require("debug")("development:mongoose"); //After requiring the package, we can define namespace(i.e. development, production, etc) here.

mongoose
    .connect(`${config.get("MONGODB_URI")}/scatch`)  
    .then(function(){
        dbgr("Database connected"); 
    })
    .catch(function(err){
        dbgr(err);
    });

module.exports = mongoose.connection;