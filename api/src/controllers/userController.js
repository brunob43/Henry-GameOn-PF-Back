const {User,Game,Doc,Donation} = require("../db.js")

const dbData = async() => {
    const data= await User.findAll(
        {
        where: { user_deleted : false },
        include:[{
            model:Game,
<<<<<<< HEAD
            attributes:["game_id","game_name"],
=======
            attributes:["game_id", "game_id"],
>>>>>>> 4c6f354a838d7d0b82b31e6552cf6a1cd7581cac
            through:{
                attributes:[]
            }
        },{
            model:Doc,
<<<<<<< HEAD
            attributes:["doc_id","doc_name"],
=======
            attributes:["doc_id", "doc_name"],
>>>>>>> 4c6f354a838d7d0b82b31e6552cf6a1cd7581cac
            through:{
                attributes:[]
            }
        }
        ,{
            model:Donation,
            attributes:["donation_id"],

        }
    ]    
        }
    );
    return data;
}

const dbAllDeletedData = async() => {
    const data= await User.findAll(
        {
        include:[{
            model:Game,
            attributes:["game_id", "game_name"],
            through:{
                attributes:[]
            }
        },{
            model:Doc,
            attributes:["doc_id", "doc_name"],
            through:{
                attributes:[]
            }
        }
        ,{
            model:Donation,
            attributes:["donation_id"],

        }
    ]    
        }
    );
    return data;
}

const getAllUsers = async() => {
    const DatosDb= await dbData();
    return [...DatosDb]
}

const getAllDeletedUsers = async() => {
    const DatosDelDb= await dbAllDeletedData();
    return [...DatosDelDb]
} 

module.exports = {getAllUsers, getAllDeletedUsers}