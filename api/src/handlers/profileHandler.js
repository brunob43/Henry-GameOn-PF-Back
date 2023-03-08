
const { User, Game,Doc,Donation } = require("../db.js");


const profileHandler = async (req,res) => {
    try {
        let { user_name, user_email, user_image, user_password } = req.body;
        console.log(user_password,"password")
        if(![user_email].every(Boolean)) return res.status(404).
        send("Falta enviar datos");
        const loadedUser = await User.findAll ({ where: {user_email},
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
                attributes:["donation_id"]
            }
        ]  });
        if (loadedUser.length>0) {
            res.status(200).json(loadedUser[0]);

        } else {
            
            if (user_password == undefined) {
                user_password = "";
                const newUser= await User.create({user_name, user_email, user_image, user_password})
                res.status(200).json(newUser);
            } else {
                const newUser= await User.create({user_name, user_email, user_image, user_password})
                res.status(200).json(newUser);
            }

            
            
        };

    } catch (error) {
        res.status(400).json({error:error.message});
    };
};
const profileEditHandler=async(req,res)=>{
    const{internal_id}=req.query
    try {
        const user = await User.findAll ({ where: {internal_id},
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
              attributes:["donation_id"]
          }
      ]  });
          res.status(200).json(user[0]);
        
    } catch (error) {
        res.status(400).json({error:error.message});
    }

}
module.exports = { profileHandler, profileEditHandler };