const {User,Game,Doc,Donation} = require("../db.js")

const dbData = async() => {
    const data= await User.findAll(
        {
        where: { user_deleted : false },
        include:[{
            model:Game,
            attributes:["game_name"],
            through:{
                attributes:[]
            }
        },{
            model:Doc,
            attributes:["doc_name"],
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
        where: { user_deleted : true },
        include:[{
            model:Game,
            attributes:["game_name"],
            through:{
                attributes:[]
            }
        },{
            model:Doc,
            attributes:["doc_name"],
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
    const DatosDb= await dbAllDeletedData();
    return [...DatosDb]
} 

module.exports = {getAllUsers, getAllDeletedUsers}