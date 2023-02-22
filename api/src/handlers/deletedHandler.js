const {User,Game,Doc,Donation} = require("../db")
const {getAllDeletedUsers} = require("../controllers/userController.js")
const {getDeletedAllDocs} = require("../controllers/docController.js")
const {getAllAnsweredMessages} = require("../controllers/messageController")

const deletedHandler = async(req,res) => {
    try {
        const users = await getAllDeletedUsers();
        const docs = await getDeletedAllDocs()
        const messages = await getAllAnsweredMessages()
        res.status(200).json([...users, ...docs, ...messages])
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {deletedHandler}