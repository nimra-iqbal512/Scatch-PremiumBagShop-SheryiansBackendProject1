// == User details
// full name - String
// email - String
// password - String
// contact - String
// picture - String(for disk storage), db(for db storage)
// isAdmin - Boolean
// cart - Array
// orders - Array

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    contact: Number,
    isAdmin: Boolean,
    picture: String,
    // cart: [], this statement can also be writtten as below
    cart: {
        type: Array,
        default: [],
    },
    orders: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model('user', userSchema);
