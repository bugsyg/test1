var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/patolucas', {useNewUrlParser: true}, function(error){
    if(error){
        throw error;
    }else{
        console.log("Mongosucks")
    }
})

module.exports = mongoose;