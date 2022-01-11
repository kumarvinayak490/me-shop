function checkAuth(req,res,next){

    if(req.session.uid){
       res.locals.isAuth = true;
       res.locals.isAdmin=req.session.isAdmin;
    }

    next();
}


module.exports=checkAuth;