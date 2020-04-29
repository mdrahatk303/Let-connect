

module.exports.home=function(req,res)
{
    return res.render('home',{title:'home',url:req.url});
}
