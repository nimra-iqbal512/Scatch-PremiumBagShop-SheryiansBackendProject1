const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/scatch`)    //This string is only for local connection. Will not work when hosted online
.then(function(){
    console.log("Database connected"); 
})
.catch(function(err){
    console.log(err);
});

module.exports = mongoose.connection;