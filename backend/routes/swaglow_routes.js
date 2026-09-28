import express from 'express';
import productModel from '../models/productModel.js'


const router = express.Router();

//const productMod = require('../models/productModel')


// to get all products
router.post("/ToaddProducts", async(req, res)=>{

    try{
        const AddProduct = new productModel(req.body);

        await AddProduct.save();

        console.log("REQUEST RECEIVED");
       console.log(req.body);

        res.status(201).json({
            
            status : true,
            statusCode : 200,
            message : "Succesfully Added",
        
        })

    }catch(err){
       res.status(500).json({
         status : false,
         statusCode : 500,
         message : err.message
    
       });
    }
});



router.get('/ToGetProducts', async(req, res)=>{
    try{
     
     const prod = await productModel.find();

        res.status(201).json({
            
            status : true,
            statusCode : 200,
            message : "Fetched the products",
            data : prod
        })


    } catch(error){

        res.status(500).json({
         status : false,
         statusCode : 500,
         message : error.message
    
       });
    }
});


router.get('/ToGetProducts/:id', async(req, res)=>{
    try{
     
     const prodtn = await productModel.findOne();

        res.status(201).json({
            
            status : true,
            statusCode : 200,
            message : "Fetched the product",
            data : prodtn
        })


    } catch(error){

        res.status(500).json({
         status : false,
         statusCode : 500,
         message : error.message
    
       });
    }
});


export default router;