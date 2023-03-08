const { Message } = require("../db.js")

const getAllMessages = async() => {
    const allMessages = await Message.findAll()
    return allMessages
}

module.exports = {getAllMessages}