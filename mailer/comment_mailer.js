const nodemailer=require('../config/nodemailer');

module.exports.newComment=function(comment)
{
    let htmlPage=nodemailer.rendertemplate({data:comment},'/comments/newComment.ejs');//.ejs must be used
    nodemailer.transporter.sendMail({
        from:'"Codeial Development""rahatscience@gmail.com"',
        to:comment.user.Email,
        subject:"Test Mail",
        html:htmlPage
        //html:`Hi!! <h3>${comment.user.Name}</h3> How are you!!`
    },(err,info)=>{
        if(err){console.log(err);return}
        console.log(info);
        return;
    })
}