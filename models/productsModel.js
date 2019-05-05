const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    price : {type : Number, required : true},
    inStock : {type : Number, required : true},
    numBought : {type : Number, required : true},
    image : {type : String, required : true},
    photos: {type: Array, required: true},
});

const Product = mongoose.model("products", ProductSchema);

const Products = {
    get : function(resolve, reject){
        Product.find()
            .then(products => {
                resolve(products);
            })
            .catch(err => {
                reject(err);
            });
    },

    getOne : function(resolve, reject, ProductId){
        Product.findById(ProductId)
            .then(product => {
                resolve(product);
            })
            .catch(err => {
                reject(err);
            });
    },

    create : function(resolve, reject, newProduct){
        Product.create(newProduct)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update : function (resolve, reject, ProductId, updatedProduct){
        Product.findByIdAndUpdate(ProductId, {$set : updatedProduct}, {new : true})
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    },

    updateStockBought : function (resolve, reject, ProductId, updatedProduct){
        Product.findByIdAndUpdate(ProductId, {$set : {"inStock": updatedProduct.inStock, "numBought" : updatedProduct.numBought}}, {new : true})
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    },

    delete : function (resolve, reject, ProductId){
        Product.findByIdAndRemove(ProductId)
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    }

}


module.exports = Products