const jwt = require('jsonwebtoken');

const dotenv =require('dotenv')
dotenv.config()

let users = {
    a:"a",
    b:"b"
}
exports.commentsRouteHandler = (req,res)=>{
    res.render('comments', {user:req.jwtUser.payload.username})
}
exports.login = (req,res)=>{
    console.log('in controller login')
    console.log(req.body)
    let username = req.body.username
    let password = req.body.password
    console.log(username + password)
    if(username=='' || password==''){
        res.status(401).send('user name or password is empty try to login again')
    }
    if(!users[username]){
        res.status(401).send('user not found try to login again')
    }
    if (users[username] !== password){
        console.log(username + password)
        return res.status(401).send('password did not match')
    }  
    //use the payload to store information about the user such as username, user role, etc.
    let payload = {username: username}

    //create the access token with the shorter lifespan
    let accessToken = jwt.sign({
        payload,
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 });

    //send the access token to the client inside a cookie
    res.cookie("jwt", accessToken, {/*secure: true,*/ httpOnly: true})
    res.redirect('/comments')
}


