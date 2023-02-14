const axios= require("axios");
const {User,Game} = require("../db.js")

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

<<<<<<< HEAD
const dbData = async() => {
    const data= await User.findAll(
    //     {
    //     include:{
    //         model:Game,
    //         attributes:["name"],
    //         through:{
    //             attributes:[]
    //         }
    //     }   
    // }
    );
    return data;
}

const getAllUsers = async() => {
    const DatosApi= await apiData();
    const DatosDb= await dbData();
    return [...DatosApi,...DatosDb]
}
=======
const allData = () => {}

const getAllUsers = () => {}
>>>>>>> e6f64eb18445f0c1770533f3858f177612912b17

const createUser = () => {}

const updateUser = () => {}

const deleteUser = () => {}

module.exports = {allData, apiData, dbData, getAllUsers, createUser, updateUser, deleteUser}