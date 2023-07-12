const userDB = {
    users: require('./../model/users.json'),
    setUsers: function (data) {this.users = data}
}
const bcrypt = require('bcrypt')
require('dotenv').config()
const fsPromises = require('fs').promises
const jwt = require('jsonwebtoken')
const path = require('path')
const cookie = require('cookie-parser')
// const handleRefreshToken = async (req, res) => {

const handleRefreshToken = async (req, res) => {
    const {user, password} = req.body;

    const foundUser = userDB.users.find(person => person.username === user)
    if(!foundUser) return res.sendStatus(401); //UnAuthorized
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"username": foundUser.username},
                process.env.ACCESS_TOKEN,
                {expiresIn: "1h"}
            )
            res.json({accessToken})
        }
    )
}


module.exports = {handleRefreshToken}