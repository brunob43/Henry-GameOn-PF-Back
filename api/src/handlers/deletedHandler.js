const {User,Game,Doc,Donation} = require("../db")
const {getAllDeletedUsers} = require("../controllers/userController.js")
const {getDeletedAllDocs} = require("../controllers/docController.js")

const deletedHandler = async(req,res) => {
    try {
        const users = await getAllDeletedUsers();
        const docs = await getDeletedAllDocs()
        res.status(200).json([...users, ...docs])
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {deletedHandler}