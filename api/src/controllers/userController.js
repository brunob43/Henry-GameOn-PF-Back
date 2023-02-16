const axios= require("axios");
const {User,Game,Doc,Donation} = require("../db.js")

const apiData = async() => {
    try {
        const data = (await axios.get(`https://jsonplaceholder.typicode.com/users`)).data;
        let cleanData=[];
        // const cleanData = data.map((u)=>{
        //     user_name : u.name
        // })
        for (let u of data){
            let  newUser={
                user_name: u.name,
                user_email: u.email,
                user_id:u.id
            } 
            cleanData.push(newUser)
        }
        return cleanData;
    
    } catch (error) {
        res.status(400).send("error")
    }
}

const dbData = async() => {
    const data= await User.findAll(
        {
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
    const DatosApi= await apiData();
    const DatosDb= await dbData();
    return [...DatosApi,...DatosDb]
}

module.exports = {getAllUsers}