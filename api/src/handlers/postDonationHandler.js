const {User,Game,Doc,Donation} = require("../db")

const postDonationHandler = async (req, res) => {
    try {
       const {donation_name, donation_quantity, internal_id} = req.body

       const newDonation = await Donation.create({
        donation_name,
        donation_quantity
       })

       await newDonation.setUser(internal_id)

       res.status(200).send(newDonation)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {postDonationHandler}