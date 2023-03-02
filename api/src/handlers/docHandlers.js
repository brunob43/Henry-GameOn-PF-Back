const {Doc} = require("../db")
const {getAllDocs, getDeletedAllDocs} = require("../controllers/docController.js")

const getDocHandler = async(req,res) => {
    const { name } = req.query;
    const { admin } = req.query;

    const allDocs = await getAllDocs()
    const allDeletedDocs = await  getDeletedAllDocs()

    try {

        if(admin){
            if (name) {
                let docsName =  allDeletedDocs.filter((doc) => doc.doc_name.toLowerCase().includes(name.toLowerCase()))
                if (docsName.length) {
                    res.status(200).json(docsName)
                } else throw Error(`Resultados no encontrados`);
            } else{
                res.status(200).json(allDeletedDocs)
            }
        }else{
            if (name) {
                let docsName = allDocs.filter((doc) => doc.doc_name.toLowerCase().includes(name.toLowerCase()))
                if (docsName.length) {
                    res.status(200).json(docsName)
                } else throw Error(`Resultados no encontrados`);
            } else{
                res.status(200).json(allDocs)
            }
        }
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getIdDocHandler = async (req,res) => {
    const { id } =req.params;
    try {    
        const user = await Doc.findOne({
            where:{doc_id:id}});
        res.status(200).json(user)
    } catch (error) {
        res.status(400).send(`El id: ${id} no corresponde a un Usuario existente`)
    }
}

const docViewsHandler = async(req,res) => {
    const { doc_id } = req.params;
    try {
        const doc = await Doc.findOne({
            where:{doc_id}});
        let newViews =doc.doc_views + 1
        await doc.update({
            doc_views: newViews
        });
        res.status(200).send(`El documento ${doc_id} fue visto una vez mas`)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
 }

const updateDocHandler = async(req,res) => {
    try {
        const { doc_id } = req.params;//para obtener info de un catalogo.
        
        const {

          doc_name,
          doc_topic,
          doc_content,
          doc_image
          
        } = req.body;
        await Doc.update(
        {
        doc_name,
        doc_topic,
        doc_content,
        doc_image,     
        },
        { where: { doc_id } }
      );
      res.status(200).send(`Se actualizó el documento ${doc_id}`)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const postDocHandler = async (req,res) => {
 
    try {
        const {doc_name, doc_image,doc_topic, doc_content,doc_author} = req.body; 
        let imageUrl = ""
        if (doc_image) {
            imageUrl = doc_image
        } else {
            imageUrl = "https://thumbs.dreamstime.com/b/document-icon-vector-stack-paper-sheets-illustration-131104983.jpg"
        }

        console.log(req.body) 
        if(![doc_name,doc_content,doc_topic].every(Boolean)) return res.status(404).
        send("Falta enviar datos");
        const newDoc= await Doc.create({doc_name, doc_content, doc_image : imageUrl,doc_topic,doc_author})
        res.status(200).json(newDoc)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deleteDocHandler = async (req,res) =>{
    const { doc_id } = req.params;
    const docToDelete = await Doc.findAll({where:{doc_id}})
    try {
        if (docToDelete.length) {
            if (!docToDelete[0].doc_deleted){
                Doc.update({
                    doc_deleted: true
                },{
                    where:{doc_id}
                })
                res.status(200).send(docToDelete) 
            } else {
                Doc.update({
                    doc_deleted: false
                },{
                    where:{doc_id}
                })
            res.status(200).send(docToDelete) 
            }
        } else {
            throw Error ("El Juego no existe")
        }

    } catch (error) {
        res.status(400).json({error:error.message})
    }
 }


module.exports = {getDocHandler, getIdDocHandler, updateDocHandler, postDocHandler, deleteDocHandler, docViewsHandler}