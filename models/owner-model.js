// Keeping in mind the idea of seperation of concerns, we are creating a separate model for the Owner.

const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/scatch`);

const ownerSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    // cart: [], no cart bcoz owner can't buy anything
    // orders: [], owner don't place orders, instead he has products to sell
    products: {
        type: Array,
        default: [],
    }, 
    picture: String,
    gstin: String,
});

module.exports = mongoose.model('owner', ownerSchema);
