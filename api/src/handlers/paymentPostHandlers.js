require('dotenv').config();
const axios = require("axios");
const {ACCESS_TOKEN} = process.env

const paymentPostHandler = async (req, res) => {
    const { id, data } = req.body

    const dataID = data

    console.log(dataID)

    try {
        const paymentDetail = await axios.get(`https://api.mercadopago.com/v1/payments/${dataID.id}`,{ headers: {'Authorization': ACCESS_TOKEN } })
        console.log(paymentDetail)

        try {
            if(![ id ].every(Boolean)) return res.status(404).send("Falta enviar datos");
            const newPayment= await 
            
            console.log(req.body);
            res.status(200).json(newPayment);
    
        }   catch (error) {
            res.status(400).json({error: error.message})
            console.log(error.message)
    
        }

    } catch (error) {
        res.status(400).json({error: error.message})
        console.log(error.message)
    
    }

}



module.exports = paymentPostHandler