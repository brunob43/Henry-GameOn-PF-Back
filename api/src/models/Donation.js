const { DataTypes, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Donation",{
      
        donation_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        donation_name:{
            type:DataTypes.STRING,
            allowNull: false,
        },    
        donation_info:{
            type:DataTypes.STRING,
            allowNull: false,
        } ,
        donation_quantity:{
            type: DataTypes.INTEGER, 
            allowNull: false,
        }
     },
    {
        timestamps: false
       }
    );
}