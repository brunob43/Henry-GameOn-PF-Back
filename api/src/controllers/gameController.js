const {Game, User} = require ("../db")

// const apiGameData = async () => {
//     const apiGames = ["Juegos"]

//     return apiGames
// }

const dbGameData = async () => {
    const dbGames = await Game.findAll({
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

module.exports = {allGameData}