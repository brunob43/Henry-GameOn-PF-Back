const {User,Game,Doc, Message} = require("../db")
const {getAllDeletedUsers} = require("../controllers/userController.js")
const {getDeletedAllDocs} = require("../controllers/docController.js")
const {getAllAnsweredMessages} = require("../controllers/messageController")
const {allDeletedGameData} = require("../controllers/gameController")

const deletedHandler = async(req,res) => {
    try {
        const users = await getAllDeletedUsers();
        const docs = await getDeletedAllDocs()
        const messages = await getAllAnsweredMessages()
        const games = await allDeletedGameData()
        res.status(200).json([...users, ...docs, ...messages, ...games])
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {deletedHandler}