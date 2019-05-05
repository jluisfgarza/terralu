const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    username: {type: String, required: true},
    userEmail: {type: String, required: true},
    address: {type: String, required: true},
    products: {type: Array, required: true},
    total : {type : Number, required : true},
    paypalId: {type: String, required: true},
    date: { type: Date, default: Date.now },
}, {timestamps: true});

const Order = mongoose.model("orders", OrderSchema);

const Orders = {
    get : function(resolve, reject){
        Order.find()
            .then(orders => {
                resolve(orders);
            })
            .catch(err => {
                reject(err);
            });
    },
    getOne : function(resolve, reject, OrderId){
        Order.findById(OrderId)
            .then(order => {
                resolve(order);
            })
            .catch(err => {
                reject(err);
            });
    },

    getByIds : function(resolve, reject, OrderIds){
        Order.find({_id: {$in : OrderIds}})
            .then(orders => {
                resolve(orders);
            })
            .catch(err => {
                reject(err);
            });
    },

    create : function(resolve, reject, newOrder){
        Order.create(newOrder)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update : function (resolve, reject, OrderId, updatedOrder){
        Order.findByIdAndUpdate(OrderId, {$set : updatedOrder}, {new : true})
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    },

    delete : function (resolve, reject, OrderId){
        Order.findByIdAndRemove(OrderId)
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    }
}

module.exports = Orders