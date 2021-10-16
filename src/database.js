var mongoose = require ('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/patolucas', {
    useNewUrlParser: true,
    })
    .then(db => console.log('mongosucksass'))
    .catch(err=>console.log(err))
module.exports = mongoose;