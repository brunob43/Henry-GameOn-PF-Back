
const { Game } = require("../db")
const { allGameData, allDeletedGameData } = require("../controllers/gameController")


module.exports = {
    getGameHandler: async (req, res) => {
        
        const { name } = req.query;
        const { admin } = req.query;
        
        const allGames = await allGameData()
        const allDeletedGames = await allDeletedGameData()

        try {
            if (admin) {
                if (name) {
                    let gamesName = allDeletedGames.filter((game) => game.game_name.toLowerCase().includes(name.toLowerCase()))
                    if (gamesName.length) {
                        res.status(200).json(gamesName)
                    } else throw Error(`Resultados no encontrados`);
                } else {
                    res.status(200).json(allDeletedGames)
                }
            } else {
                if (name) {
                    let gamesName = allGames.filter((game) => game.game_name.toLowerCase().includes(name.toLowerCase()))
                    if (gamesName.length) {
                        res.status(200).json(gamesName)
                    } else throw Error(`Resultados no encontrados`);
                } else {
                    res.status(200).json(allGames)
                }
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }



    },

    getIdGameHandler: async (req, res) => {
        try {
            const { id } = req.params
            console.log(id)
            const gameId = await Game.findByPk(id)
            res.status(200).json(gameId)

        } catch (error) {
            res.status(400).send(`No se encontro el juego con el ${id}`)

        }


    },
    postGameHandler: async (req, res) => {
        try {
            console.log(req.body)
            const { game_name, game_topic, game_image, game_difficulty } = req.body
            if (![game_name, game_topic, game_image, game_difficulty].every(Boolean)) return res.status(404).send("Falta enviar datos");
            const newGame = await Game.create({ game_name, game_topic, game_image, game_difficulty });
            res.status(200).json(newGame)

        } catch (error) {
            res.status(400).json({ error: error.message })

        }
    },
    gamesViewsHandler: async (req, res) => {
        const { game_id } = req.params;
        try {
            const game = await Game.findOne({
                where: { game_id }
            });
            let newViews = game.game_views + 1
            await game.update({
                game_views: newViews
            });
            res.status(200).send(`El juego ${game_id} fue visto una vez mas`)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    updateGameHandler: async (req, res) => {
        try {
            const { game_id } = req.params;//para obtener info de un catalogo.
            console.log(game_id)
            const { game_name, game_topic, game_image, game_difficulty } = req.body;
            await Game.update(
                { game_name, game_topic, game_image, game_difficulty },
                { where: { game_id } }
            );
            res.status(200).send(`Se actualizó el juego ${game_id}`)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    deleteGameHandler: async (req, res) => {
        const { game_id } = req.params;
        const gameToDelete = await Game.findAll({where:{game_id}})
        try {
        if (gameToDelete.length) {
            if (!gameToDelete[0].game_deleted){
                Game.update({
                game_deleted: true
                },{
                    where:{game_id}
                })
                res.status(200).send(gameToDelete) 
            } else {
                Game.update({
                    game_deleted: false
                },{
                    where:{game_id}
                })
            res.status(200).send(gameToDelete) 
        }
        } else {
            throw Error ("El Juego no existe")
        }
        }catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    
    gameLikesHandler : async(req,res) => {
        const { game_id } = req.params;
        const {like_game} =req.query
        console.log(game_id, "gameId", like_game, "likeGame")
        try {
            const game = await Game.findOne({
                where:{game_id}});
                console.log(game)
            if(like_game){
                let newLikes = game.game_likes + 1
                await game.update({
                    game_likes: newLikes
                });
                res.status(200).send(`El juego ${game_id} recibió un like`)
            }else{
                let newLikes =game.game_likes - 1
                await game.update({
                    game_likes: newLikes
                });
                res.status(200).send(`El juego ${game_id} disminuyó un like`)
            }
            
            
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    },
}