
const {User} = require("../db")
const {getAllUsers, createUser, updateUser, deleteUser} = require("../controllers/index.js")

const getUsersHandler = async(req,res) => {
try {
    const users = await getAllUsers();
    res.status(200).json(users)
} catch (error) {
    res.status(400).json({error:error.message})
}
}
 
const getIDUsersHandler = async (req,res) => {
    try {
        const { id } =req.params;
        const user = await User.findOne({
            where:{user_id:id}});
        res.status(200).json(user)
    } catch (error) {
        res.status(400).send(`El id: ${id} no corresponde a un Usuario existente`)
    }
}

const updateUsersHandler = async(req,res) => {
    try {
        const { internal_id } = req.params;//para obtener info de un catalogo.
        console.log(internal_id);
        const {
          user_name,
          user_email,
          user_image,
          user_type,
          user_state,
        } = req.body;
        await User.update(
        {
        user_name,
        user_email,
        user_image,
        user_type,
        user_state,
        },
        { where: { internal_id } }
      );
      res.status(200).send(`Se actualizó el usuario ${internal_id}`)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const postUsersHandler = async (req,res) => {
    try {
        const {user_name, user_email, user_image, user_type, user_state } = req.body;
        if(![user_name,user_email].every(Boolean)) return res.status(404).
        send("Falta enviar datos");
        const newUser= await User.create({user_name, user_email, user_image, user_type, user_state })
        res.status(200).json(newUser)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deleteUsersHandler = async (req,res) =>{
    const { internal_id } = req.params;
    try {
        await User.update({
            user_deleted: true
        },{
            where:{internal_id}
        });
        res.status(200).send(`El usuario ${internal_id} fue eliminado`)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
 }


module.exports = {getUsersHandler, getIDUsersHandler, updateUsersHandler, postUsersHandler, deleteUsersHandler}