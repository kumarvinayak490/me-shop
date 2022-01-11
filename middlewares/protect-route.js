function protectRoute(req,res,next){

    if(!req.session.uid){

       return res.render("shared-views/401");
    }

    if(req.path.startsWith('/admin') && !req.session.isAdmin){

        return res.render('shared-views/505');
    }


    next();

}


module.exports=protectRoute;