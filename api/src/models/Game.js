const { DataTypes, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Game",{
        game_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        game_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        game_topic:{
            type:  DataTypes.STRING,
            allowNull: false
        },

        game_directory:{
            type: DataTypes.STRING,
            allowNull: false
        },
        
        game_difficulty:{
            type: DataTypes.ENUM("Easy", "Medium", "Hard"),
            allowNull: false
        },

        game_views:{
            type: DataTypes.INTEGER
        }

       },
       {
        timestamps: false
       }
    );
}