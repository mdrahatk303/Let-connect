const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/codeialDb');

const db=mongoose.connection;
db.on('error',function(err)
{
    console.log(err.message);
});

db.once('open',function()
{
    console.log("successfully connected to database");
})