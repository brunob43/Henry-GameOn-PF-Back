const {User,Game,Doc,Donation} = require("../db")
const {getAllDeletedUsers} = require("../controllers/userController.js")

const deletedHandler = async(req,res) => {
    try {
        const users = await getAllDeletedUsers();
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {deletedHandler}