const mongoose = require ('mongoose');
const connectioinString = process.env.DB_URL;
const port = process.env.PORT || 4000;

module.exports = function(){
    mongoose.connect(connectioinString, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(con=>{
        console.log(con.connections);
         console.log('database connection successful')
    
})
}