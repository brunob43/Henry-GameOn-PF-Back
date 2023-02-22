const {Game, User} = require ("../db")

// const apiGameData = async () => {
//     const apiGames = ["Juegos"]

//     return apiGames
// }

const dbGameData = async () => {
    const dbGames = await Game.findAll({
        where: { game_deleted : false },
        include:{
            model:User,
            attributes:["user_name"],
            through:{
                attributes:[]
            }
        }   
    })

    return dbGames
}

const dbDeletedGameData = async () => {
    const dbGames = await Game.findAll({
        where: { game_deleted : true },
        include:{
            model:User,
            attributes:["user_name"],
            through:{
                attributes:[]
            }
        }   
    })

    return dbGames
}

const allGameData = async () => {
    //const apiGames = await apiGameData()
    const dbGames = await dbGameData()

    return [...dbGames]
}

const allDeletedGameData = async () => {
    //const apiGames = await apiGameData()
    const dbGames = await dbDeletedGameData()

    return [...dbGames]
}

module.exports = {allGameData, allDeletedGameData}