const express=require('express');
const app=express();
//app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views',__dirname+'/views');

module.exports.home=function(req,res)
{
    res.render('home');
}