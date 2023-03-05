const {User,Game,Doc,Donation} = require("../db.js")

const dbData = async() => {
    const data= await User.findAll(
        {
        where: { user_deleted : false },
        include:[{
            model:Game,
            attributes:["game_id", "game_id"],
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

const dbAllDeletedData = async() => {
    const data= await User.findAll(
        {
        include:[{
            model:Game,
            attributes:["game_id"],
            through:{
                attributes:[]
            }
        },{
            model:Doc,
            attributes:["doc_id"],
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