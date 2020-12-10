const jwt = require('jsonwebtoken');

const dotenv =require('dotenv')
dotenv.config()

let users = {
    john:{password:"passwordjohn"},
    mary:{password:"passwordmary"}
}
exports.commentsRouteHandler = (req,res)=>{
    res.render('comments')
}
exports.login = (req,res)=>{
    console.log('in controller login')
    console.log(req.body)
    let username = req.body.username
    let password = req.body.password
    console.log(username + password)
    if (!username && !password && users[username] !== password){
        return res.status(401).send('either empty user name / password or username is equal to password')
    }  
    //use the payload to store information about the user such as username, user role, etc.
    let payload = {username: username}

    //create the access token with the shorter lifespan
    let accessToken = jwt.sign({
        payload,
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 2 });

    //send the access token to the client inside a cookie
    res.cookie("jwt", accessToken, {/*secure: true,*/ httpOnly: true})
    res.redirect('/comments')
}


