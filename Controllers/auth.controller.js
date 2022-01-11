const bcrypt=require('bcryptjs');

const User=require('../Models/user.model');

const utils=require('../utils/flashError');

function getSignUp(req,res){
        res.render('auth-views/sign-up');
}

function getLogIn(req,res){

    res.render('auth-views/log-in');
}

async function registration(req,res){

    const enteredUser=req.body;

     if (
       !enteredUser.name ||
       !enteredUser.password ||
       !enteredUser.email ||
       !enteredUser.email.includes("@")
     ) {
       
        const data={
            name:enteredUser.name,
            password:enteredUser.password,
            email:enteredUser.email,
            message:'Please check your entry',
        }

        utils.flashSessionData(req,data,function(){

            return res.redirect('/sign-up',{data:data});
        })
      
     }

     const hashedPassword= await bcrypt.hash(enteredUser.password,12);

     enteredUser.password=hashedPassword;

    const user = new User(enteredUser);

    try{
        await user.save();
    }

    catch(error){
        console.log(error);
        return;
    }
    
    res.redirect("/");
}


async function signIn(req,res){

    const enteredUser=req.body;

    if(!enteredUser.email){
        console.log('Please enter a value');
        return;
    }

    const existingUser= await User.findUser(enteredUser.email);

    if(!existingUser){
        console.log('User does not exist');
        return;
    }

    const isPasswordEqual= await bcrypt.compare(enteredUser.password,existingUser.password);

    if(!isPasswordEqual){
        console.log('Please check your credentials');
        return;
    }

    req.session.uid=existingUser._id;
    req.session.isAdmin=existingUser.isAdmin;

    req.session.save(function(){

        res.redirect("/");

    });
    
}

function logout(req,res){
    req.session.uid=null;
    res.locals.isAuth=null;


    res.redirect("/");
}


module.exports={
    getSignUp:getSignUp,
    getLogIn:getLogIn,
    registration:registration,
    signIn:signIn,
    logout:logout,
}