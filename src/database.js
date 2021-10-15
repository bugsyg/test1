var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/patolucas', {
    useNewUrlParser: true,
    })

    .then(db => console.log('mongosucksass'))
    .catch(err=>console.log(err))



module.exports = mongoose;