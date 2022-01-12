var mongoose = require ('mongoose');
mongoose.connect('mongodb://bugsygel:43442856@cluster0-shard-00-00.jijz8.mongodb.net:27017,cluster0-shard-00-01.jijz8.mongodb.net:27017,cluster0-shard-00-02.jijz8.mongodb.net:27017/MyFirstDatabase?ssl=true&replicaSet=atlas-7vyxgv-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    })
    .then(db => console.log('mongosucksass'))
    .catch(err=>console.log(err))
module.exports = mongoose;
