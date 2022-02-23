const jwt = require('jsonwebtoken');

const JWT_SECRET = "Yashisagoodboy";

const fetchuser = (req, res, next) => {
    
    //Get user from the jwt token and add id to req object
    const token = req.header('phonetoken');
    if(!token){
        res.status(401).send({error:"Please authenticate with a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.phone = data.phone;
        
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate with a valid token"})
        
    }
}

module.exports = fetchuser