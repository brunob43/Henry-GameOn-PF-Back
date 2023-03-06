require('dotenv').config();
const axios = require("axios");
const {ACCESS_TOKEN} = process.env
const {updateUsersHandler} = require("./userHandlers")
const {User, Donation} = require("../db.js")

const paymentPostHandler = async (req, res) => {
    const { id, data } = req.body

    const header = { 
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        } 
    }

    const dataID = data.id


    console.log(dataID, "dataID")

    try {

        const paymentDetail = await axios.get(`https://api.mercadopago.com/v1/payments/${dataID}`, header)

        const {description, collector_id, status_detail, status, transaction_amount} = paymentDetail

        console.log(description, collector_id, status_detail, status, transaction_amount)
        
        const newDonation = await Donation.update(
            
            {
            donation_name : description,
            donation_data_id : dataID,
            donation_info : status_detail,
            donation_status : status,
            donation_quantity : transaction_amount
            },
            {where : { donation_id_link : collector_id}}
        )

        console.log("-------------------------------------------------------POST PAYMENT--------------------------------------------------------------INICIO--------------------------------------------------")
        console.log(newDonation, "newDonation")
        console.log("--------------------------------------------------------POST PAYMENT--------------------------------------------------------------FIN--------------------------------------------------")

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