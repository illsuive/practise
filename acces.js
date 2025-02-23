let jwt = require('jsonwebtoken');

let giveAccese = (req,res,next)=>{
    const { data } = req.cookies;  
    if(!data){
        return res.status(401).json({message:"token is missing"});
    }

    try {
        let user = jwt.verify(data,'qwerty');
        if(!user){
            return res.status(401).json({message:"token is invalid"});
        }
        req.users = user;
        next()
    } catch (error) {
        return res.status(401).json({message:"token is invalid"});
    }
    
}

module.exports =  giveAccese;


