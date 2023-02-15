const axios= require("axios");
const {Doc} = require("../db.js")

// const DocData = () => {
//     try {
//         const data = get("").data;
//         let cleanData=[];
     
//         for (let u of data){
//             let  newDoc={
//                 doc_name: d.name,
//                 doc_id: d.id,
//                 doc_topic: d.topic
//             } 
//             cleanData.push(newDoc)
//         }
//         return cleanData;
    
//     } catch (error) {
//         res.status(400).send("error")
//     }
// }

const dbDocData = async() => {

        const data= await Doc.findAll(
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
    
    const getAllDocs = async() => {
        //const DatosApi= await apiDocData();
        const DatosDb= await dbDocData();
        return [...DatosDb]
    }

module.exports = {getAllDocs}


