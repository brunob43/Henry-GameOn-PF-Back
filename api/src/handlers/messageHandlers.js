const { Message } = require("../db")
// const {getAllDocs} = require("../controllers/docController.js")

const getMessages = async (req,res)=>{
    try {
        const messages= await Message.findAll();
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getIdMessage= async(req,res) =>{
    try {
        const {id}=req.paramns;
        const message = await Message.findOne({where:{message_id:id}});
        res.status(200).json(message)
    } catch (error) {
        res.status(400).send(`El id: ${id} no corresponde a un mensaje existente`)
    }
}

const postMessage = async (req,res) => {
      try {
          const {message_email,message_issue, message_content} = req.body;
          if(![message_email,message_content,message_issue].every(Boolean)) return res.status(404).
          send("Falta enviar datos");
          const newMessage= await Message.create({message_content, message_email,message_issue})
          res.status(200).json(newMessage)
  
      } catch (error) {
          res.status(400).json({error:error.message})
      }
  }

  const deleteMessage = async (req,res) =>{
    const { message_id } = req.params;
    try {
        await Message.update({
            message_answered: true
        },{
            where:{message_id}
        });
        res.status(200).send(`El mensaje ${message_id} fue respondido`)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
 }
 module.exports = {getMessages, getIdMessage, postMessage,deleteMessage}