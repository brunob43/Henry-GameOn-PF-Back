const axios= require("axios");
const {Doc,User} = require("../db.js")

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
            {
            where: { doc_deleted : false },
            include:{
                model:User,
                attributes:["user_name"],
                through:{
                    attributes:[]
                }
            }   
        }
        );
        return data;
    }

    const dbDeletedDocData = async() => {

        const data= await Doc.findAll(
            {
            where: { doc_deleted : true },
            include:{
                model:User,
                attributes:["user_name"],
                through:{
                    attributes:[]
                }
            }   
        }
        );
        return data;
    }
    
    const getAllDocs = async() => {
        //const DatosApi= await apiDocData();
        const DatosDb= await dbDocData();
        return [...DatosDb]
    }

    const getDeletedAllDocs = async() => {
        //const DatosApi= await apiDocData();
        const DatosDb= await dbDeletedDocData();
        return [...DatosDb]
    }

module.exports = {getAllDocs, getDeletedAllDocs}


