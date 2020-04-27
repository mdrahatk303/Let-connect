const express=require('express');
const app=express();
const port=8000;
const cookieParser = require('cookie-parser');
 const db=require('./config/mongoose');
 app.use(cookieParser());
const expressLayouts=require('express-ejs-layouts');
//for layouts

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', false);

app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views',__dirname+'/views');



const router=require('./routes');
app.use('/',router);
app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error:${err}`);
        return;

    }
    console.log(`Server is running on port:${port}`);
})