const userDB = {
    users: require('./../model/users.json'),
    setUsers: function (data) {this.users = data}
}
const bcrypt = require('bcrypt')

const handleAuth = async (req, res) => {
    const {user, password} = req.body;
    if(!user || !password) return res.status(400).json({ message: "Username and Password Required!!!" });

    const foundUser = userDB.users.find(person => person.username === user)
    if(!foundUser) return res.sendStatus(401); //UnAuthorized

    //match password
    const match = await bcrypt.compare(password, foundUser.password)
    if(match) {
        res.status(200).json({'message' : `User ${user} logged in`})
    } else {
        res.sendStatus(401);
    }
}

module.exports = {handleAuth}