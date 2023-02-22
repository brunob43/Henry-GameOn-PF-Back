const { Message } = require("../db.js")

const getAllMessages = async() => {
    const allMessages = await Message.findAll({
        where: { message_answered : false },
    })
    return allMessages
}

const getAllAnsweredMessages = async() => {
    const allMessages = await Message.findAll({
        where: { message_answered : true },
    })
    return allMessages
} 

module.exports = {getAllMessages, getAllAnsweredMessages}