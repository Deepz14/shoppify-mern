const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    qty:{
        type : String,
        default : 1
    }
})


module.exports = mongoose.model('product', productSchema);