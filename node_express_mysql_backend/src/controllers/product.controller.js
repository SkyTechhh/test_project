'use strict';
var dbConn = require('../../config/db.config');

const Product = require('../models/product.model');

let model = {
    getProducts: (offset, limit, cb) => {
        return dbConn.query("SELECT product.*, category.name FROM product INNER JOIN category ON product.CategoryID = category.id LIMIT ?, ?", [+offset, +limit], cb)
    },
    getTotalProducts: (cb) => {
        return dbConn.query("SELECT COUNT(*) AS total FROM product", cb);
    }
}

exports.findAll = function(req, res) {
    let page = 1;
    let limit = 3;
    let offset = req.query.offset;
    if (req.query.page == 0) {
        page = 1
    }
    else if (req.query.page) {
        page = req.query.page
    }
    
    if(page > 1) {
        offset = (page-1) * limit
    } else if (!offset){
        offset = 0
    }
    
    model.getProducts(offset, limit, function(err, products) {
        if(err) {
            res.json(err)
        } else {
            model.getTotalProducts(function(err, result) {
                if(err) {
                    res.json(err)
                } else {
                    let pageSize = Math.round(result[0].total/limit)
                    res.json({page: page, pageSize: pageSize, data: products, totalProducts: result[0].total});
                }
            })
        }
    })
};


exports.create = function(req, res) {
    console.log(req.body,'my req')
    const new_product = new Product(req.body);

   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Product.create(new_product, function(err, product) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Product added successfully!",data:product});
        });
    }
};


exports.findById = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err)
        res.send(err);
        res.json(product);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Product.update(req.params.id, new Product(req.body), function(err, product) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Product successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
  Product.delete( req.params.id, function(err, product) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Product successfully deleted' });
  });
};