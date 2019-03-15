module.exports = {
  MONGO_URI: `mongodb://admin:Abj8pvcyp8vUT2w9pDmf@terralu-store-shard-00-00-ocsyy.mongodb.net:27017,terralu-store-shard-00-01-ocsyy.mongodb.net:27017,terralu-store-shard-00-02-ocsyy.mongodb.net:27017/test?ssl=true&replicaSet=terralu-store-shard-0&authSource=admin&retryWrites=true`,
  LOCALDATABASE: 'mongodb://localhost/products',
  PORT: process.env.PORT || 5000,
  secretOrKey: "secret"
};