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
        console.log("-----------------------initPayment-----------------------")
        console.log(paymentDetail)
        console.log("-----------------------endPayment-----------------------")
        // console.log(paymentDetail.status_detail, paymentDetail.status,
        //     paymentDetail.additional_info.items[0].id, "paymentDetail")
        
        // const newDonation = await Donation.update(
        //     {
        //     donation_data_id : dataID,
        //     donation_info : paymentDetail.status_detail,
        //     donation_status : paymentDetail.status,
        //     },
        //     {where : { donation_id : paymentDetail.additional_info.items[0].id}}
        // )
        console.log("-------------------------------------------------------POST PAYMENT--------------------------------------------------------------INICIO--------------------------------------------------")
        // console.log(newDonation, "newDonation")
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