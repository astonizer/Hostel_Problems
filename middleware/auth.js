const jwt=require('jsonwebtoken');
var cookieParser = require('cookie-parser')
require('dotenv').config()
const User = require('../models/Users');

const checkAuth=(req,res,next)=>{
    try{
        // console.log('hello');
        const token = req.cookies.token;
        console.log(token);
        // console.log(process.env.JWT_KEY);
        jwt.verify(token, process.env.JWT_KEY,(err,decoded)=>{
            if(err)
            {   console.log("Not Authorized");
               // res.status(500).json({err:"Not Authorized"})
             
               res.redirect('/error');  
                
            }
            // console.log(decoded);
            req.userData=decoded;
            next();
        });

       
    }
    catch(error)


    {    res.redirect('/error');  
        console.log("Auth Failed Please Login First");
        
        
    }
   
}

const checkUser = (req, res, next) => {
    const token = req.cookies.token;
    
    // verification of token
    if(token) {
        jwt.verify(token, JWT_KEY, async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                //console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    checkAuth,
    checkUser
}
