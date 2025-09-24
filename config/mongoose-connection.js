const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose"); //After requiring the package, we can define namespace(i.e. development, production, etc) here.

mongoose.connect(`mongodb://127.0.0.1:27017/scatch`)    //This string is only for local connection. Will not work when hosted online
.then(function(){
    dbgr("Database connected"); 
})
.catch(function(err){
    dbgr(err);
});

module.exports = mongoose.connection;