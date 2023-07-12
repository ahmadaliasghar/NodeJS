const userDB = {
    users: require('./../model/users.json'),
    setUsers: function (data) {this.users = data}
}
const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const {user, password} = req.body;
    if(!user || !password) return res.status(400).json({ message: "Username and Password Required!!!" });

    //check for duplicate user
    const duplicate = userDB.users.find(user => user.username === user)
    if(duplicate) return res.sendStatus(409); //Conflict

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 15);
        //store new user
        const newUser = {'username': user, 'password': hashedPwd};
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromises.writeFile(path.join(__dirname, '..', "model", 'users.json'), JSON.stringify(userDB.users))
        console.log(userDB.users)
        res.status(201).json({'sucess': `New User ${user} created`}) 
    } catch (error) {
        res.status(500).json({'message': error.message})
    }
}

module.exports ={handleNewUser}