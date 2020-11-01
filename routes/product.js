const express = require('express');
const Product = require('../models/product');
const auth = require('../validationToken');
const router = express.Router();


router.post('/upload', auth ,async(req, res) => {
    
    try{

        const newProduct = new Product({
            name : req.body.name,
            price : req.body.price,
            image : req.body.img,
            qty : 1
        })

        const saveUser = await newProduct.save();
        res.json({status : 'success'})
    }
    catch(err){
        res.status(401).json({status : 'failure'});
    }

})

router.get('/products',async(req, res) => {
    try{
        const allProduct = await Product.find();

        res.status(200).json({status : 'success', Products : allProduct})
    }
    catch(err){
        res.status(401).json({status : 'failure'})
    }
})

router.get('/products/:id', async(req, res) => {
    try{

        const product = await Product.findOne({_id : req.params.id})

        res.status(200).json({status : 'success', product})
    }
    catch(err){
        res.status(401).json({status : 'failure'})
    }
})


module.exports = router;