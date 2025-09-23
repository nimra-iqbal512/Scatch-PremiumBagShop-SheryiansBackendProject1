// == Product details (its not like Amazon where we have multiple sellers, its like a single shop, so every product has the same seller, which would actually be the admin)
// image
// name
// price
// discount
// bgcolor
// panecolor
// textcolor

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0,
    },
    bgcolor: String,
    panecolor: String,
    textcolor: String,
});

module.exports = mongoose.model('product', productSchema);