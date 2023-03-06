
const {User,Game,Doc,Donation} = require("../db")
const {getAllUsers, getAllDeletedUsers} = require("../controllers/userController.js")

const getUsersHandler = async(req,res) => {
    const { name } = req.query;

    const allUsers = await getAllUsers()
    const allDeletedUsers = await getAllDeletedUsers()

    try {
            if (name) {
                let usersName = allDeletedUsers.filter((user) => user.user_name.toLowerCase().includes(name.toLowerCase()))
                if (usersName.length) {
                    res.status(200).json(usersName)
                } else throw Error(`Resultados no encontrados`);
            } else {
                res.status(200).json(allDeletedUsers)
            }
    } catch (error) {
        res.status(400).json({ error: error.message })
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
          user_payment_id,
          user_state,
          user_password,
          game_id,
          doc_id,
          like_doc,
          like_game
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
        if(like_game) {
            await user.addGame(game)
        }else{
            await user.removeGame(game)
        };

      }
      if(doc_id!==0){
        const user = await User.findByPk(internal_id);
        const doc = await Doc.findByPk(doc_id);
        if(like_doc){
            await user.addDoc(doc)
        }else{
            await user.removeDoc(doc)
        }
      };
      if(user_payment_id) {
        const user = await User.findByPk(internal_id)
        console.log("-------------------------------------------USER HANDLERS------------------------------------------------------------")

        console.log(user)

        

        const newDonation = await Donation.create({
            donation_id_link : user_payment_id
        })

        console.log(newDonation)
        

        await user.addDonation(newDonation)

        console.log(user)
        console.log("--------------------------------------------USER HANDLERS-----------------------------------------------------------")

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
    const userToDelete = await User.findAll({where:{internal_id}})
    try {
        if (userToDelete.length) {
            if (!userToDelete[0].user_deleted){
                User.update({
                    user_deleted: true
                },{
                    where:{internal_id}
                })
                res.status(200).send(userToDelete) 
            } else {
                User.update({
                    user_deleted: false
                },{
                    where:{internal_id}
                })
            res.status(200).send(userToDelete) 
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