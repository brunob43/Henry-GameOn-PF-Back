
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
        const {like_game , like_doc, game_id,doc_id}=req.query
        console.log(req.query, "update user query")
        console.log(req.params, "updateuser params")
        const user = await User.findByPk(internal_id);
        const doc = await Doc.findByPk(doc_id);
        const game = await Game.findByPk(game_id);
        console.log(doc, "doc")
        console.log(user, "user")
        console.log(game, "game")

        const {
          user_name,
          user_email,
          user_image,
          user_type,
          user_state,
          user_password,
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
        if(like_game) {
            await user.addGame(game)
            console.log(user)
            return res.status(200).json(user)
        }else{
            await user.removeGame(game)
            
            return res.status(200).json(user)
        };
        
      }
      if(doc_id){
        if(like_doc){
            await user.dataValues.addDoc(doc.dataValues)
            return res.status(200).json(user)
        }else{
            await user.removeDoc(doc)
            return res.status(200).json(user)
        }
      };
     

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