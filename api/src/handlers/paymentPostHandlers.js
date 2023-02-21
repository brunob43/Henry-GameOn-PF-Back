

const paymentPostHandler = async (req, res) => {
    try {
        const { id } = req.body
        if(![ id ].every(Boolean)) return res.status(404).send("Falta enviar datos");
        const newPayment= await 
        console.log(req.body);
        res.status(200).json(newPayment);

    } catch (error) {
        res.status(400).json({error: error.message})
        console.log(error.message)

    }

}



module.exports = paymentPostHandler