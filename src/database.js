var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/patolucas', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify:false
    })

    .then(db => console.log('mongosucksass'))
    .catch(err=>console.log(err))



module.exports = mongoose;