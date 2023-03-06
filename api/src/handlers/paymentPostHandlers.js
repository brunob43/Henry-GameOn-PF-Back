require('dotenv').config();
const axios = require("axios");
const {ACCESS_TOKEN} = process.env

const paymentPostHandler = async (req, res) => {
    try {
        const { id, data } = req.body
        if(![ id ].every(Boolean)) return res.status(404).send("Falta enviar datos");
        const newPayment= await 
        
        console.log(req.body);
        res.status(200).json(newPayment);

        try {
            const paymentDetail = await axios.get(`https://api.mercadopago.com/v1/payments/${data.id}`, {headers: {Authorization : ACCESS_TOKEN }})
            console.log(paymentDetail)
    
        } catch (error) {
            res.status(400).json({error: error.message})
            console.log(error.message)
        
        }

    } catch (error) {
        res.status(400).json({error: error.message})
        console.log(error.message)

    }

}



module.exports = paymentPostHandler