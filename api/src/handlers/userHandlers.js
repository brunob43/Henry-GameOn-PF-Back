
const {User,Game,Doc,Donation} = require("../db")
const {getAllUsers, getAllDeletedUsers} = require("../controllers/userController.js")

const getUsersHandler = async(req,res) => {
try {
    const users = await getAllUsers();
    res.status(200).json(users)
} catch (error) {
    res.status(400).json({error:error.message})
}
}
 
const getIDUsersHandler = async (req,res) => { 
    const { id } = req.params;
    try {   
        const user = await User.findOne({
            where:{user_id: id, user_deleted : false}});
        res.status(200).json(user)
    } catch (error) {
        res.status(400).send(`El id  ${id} no corresponde a un Usuario existente`)
    }
}

const updateUsersHandler = async(req,res) => {
    try {
        const { internal_id } = req.params;//para obtener info de un catalogo.
        const {
          user_name,
          user_email,
          user_image,
          user_type,
          user_state,
          user_password,
          game_id,
          doc_id,
          donation_id,
          donation_name,
          donation_info,
          donation_quantity
        } = req.body;
        await User.update(
        {
        user_name,
        user_email,
        user_image,
        user_type,
        user_state,
        user_password
        },
        { where: { internal_id } }
      );
      if(game_id!==0){
        const user = await User.findByPk(internal_id);
        const game = await Game.findByPk(game_id);
        await user.addGame(game)

      }
      if(doc_id!==0){
        const user = await User.findByPk(internal_id);
        const doc = await Doc.findByPk(doc_id);
        await user.addDoc(doc)
      }
      if([donation_name,donation_info,donation_quantity].every(Boolean)) {
          const donation = await Donation.create({
            donation_name,
            donation_info,
            donation_quantity
          });
          const user = await User.findByPk(internal_id);
          await user.addDonation(donation);

      }

      res.status(200).send(`Se actualizó el usuario ${internal_id}`)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const postUsersHandler = async (req,res) => {
    try {
        const {user_name, user_email, user_image,user_password} = req.body;
        if(![user_email].every(Boolean)) return res.status(404).
        send("Falta enviar datos");
        const usuarioCargado= await User.findAll({where:{user_email}})
        console.log("usuarioC",usuarioCargado)
        if(usuarioCargado.length>0){
            res.status(200).send("Usuario ya existente")
        }else{
            
            const newUser= await User.create({user_name, user_email, user_image,user_password })
            res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deleteUsersHandler = async (req,res) =>{
    const { internal_id } = req.params;
    try {

        const user = await User.findAll({where:{internal_id}})

        if (user.length) {
            if (!user.user_deleted){
                User.update({
                    user_deleted: true
                })
                res.status(200).send(user) 
            } else {
                User.update({
                    user_deleted: false
                })
            res.status(200).send(user) 
            }
        } else {
            throw Error ("El usuario no existe")
        }


    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
    
    /*try {
        await User.update({
            user_deleted: true
        },{
            where:{internal_id}
        });
        res.status(200).send(`El usuario ${internal_id} fue eliminado`)
    } catch (error) {
        res.status(400).json({error:error.message})
    }*/
 }


module.exports = {getUsersHandler, getIDUsersHandler, updateUsersHandler, postUsersHandler, deleteUsersHandler}