const {Donation} = require("../db")

const donationHandler = async (req, res) => {

    const allDonations = await Donation.findAll()

    try {
        if (allDonations.length) {
            res.status(200).json(allDonations) 
        } else throw Error ("No se hicieron donaciones por el momento") 
    } catch (error) {
        res.status(400).json({ error: error.message })
    }


}

module.exports = {donationHandler}