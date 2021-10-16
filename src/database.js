var mongoose = require ('mongoose');
mongoose.connect('mongodb+srv://bugsygel:43442856@cluster0.jijz8.mongodb.net/cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    })
    .then(db => console.log('mongosucksass'))
    .catch(err=>console.log(err))
module.exports = mongoose;