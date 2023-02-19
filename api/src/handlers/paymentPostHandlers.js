

const paymentPostHandler = async (req, res) => {
    try {
        const { id } = req.body
        if(![ id ].every(Boolean)) return res.status(404).send("Falta enviar datos");
        const newPayment= await Payment.create({game_name});
        res.status(200).json(newPayment)

    } catch (error) {
        res.status(400).json({error: error.message})

    }

}



module.exports = paymentPostHandler