
const { User } = require("../db.js");


const profileHandler = async (req,res) => {
    try {
        const { user_name, user_email, user_image, user_password } = req.body;
        console.log(req.body, "Cuerpito")
        const loadedUser = await User.findAll ({ where: {user_email} });
        console.log(loadedUser, "usuarioCargado")
        if (loadedUser.length) {
            res.status(200).json(loadedUser[0]);

        } else {
            
            if(![user_name,user_email].every(Boolean)) return res.status(404).
            send("Falta enviar datos");
            const newUser= await User.create({user_name, user_email, user_image, user_password})
            res.status(200).json(newUser);

        };

    } catch (error) {
        res.status(400).json({error:error.message});
    };
};

module.exports = { profileHandler };