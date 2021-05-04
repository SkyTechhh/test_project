'user strict';
var dbConn = require('../../config/db.config');

var Product = function(product){
    this.productName     = product.productName;
    this.CategoryID      = product.CategoryID;
};
Product.create = function (newPro, result) {    
    dbConn.query("INSERT INTO Product set ?", newPro, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};
Product.findById = function (id, result) {
    dbConn.query("SELECT product.*, category.name FROM product INNER JOIN category ON product.CategoryID = category.id where product.id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Product.update = function(id, Product, result){
  dbConn.query("UPDATE Product SET productName=?,CategoryID=? WHERE id = ?", [Product.productName,Product.CategoryID, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Product.delete = function(id, result){
     dbConn.query("DELETE FROM Product WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Product;