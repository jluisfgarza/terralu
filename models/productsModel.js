const mongoose =  require('mongoose');
mongoose.Promise = global.Promise;

const dbProducts = mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    price : {type : Number, required : true},
    inStock : {type : Number, required : true},
    numbBought : {type : Number, required : true},
    _id : {type : Number, required : true},
});

const Products = mongoose.model("Products", dbProducts);

const ListProducts = {
    get : function(resolve, reject){
        Products.find()
            .then(products => {
                resolve(products);
            })
            .catch(err => {
                reject(err);
            });
    },

    getOne : function(resolve, reject, ProductId){
        Products.findById(ProductId)
            .then(product => {
                resolve(product);
            })
            .catch(err => {
                reject(err);
            });
    },

    create : function(resolve, reject, newProduct){
        Products.create(newProduct)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update : function (resolve, reject, ProductId, updatedProduct){
        Products.findByIdAndUpdate(ProductId, {$set : updatedProduct}, {new : true})
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    },

    delete : function (resolve, reject, ProductId){
        Products.findByIdAndRemove(ProductId)
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    }

}


module.exports = {
    ListProducts : ListProducts
}