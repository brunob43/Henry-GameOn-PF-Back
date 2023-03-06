const { DataTypes, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Donation",{
      
        donation_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        donation_name:{
            type:DataTypes.STRING,
        },
        donation_id_link :{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        donation_data_id:{
            type: DataTypes.STRING,
        },    
        donation_info:{
            type:DataTypes.STRING,
        } ,
        donation_status:{
            type:DataTypes.STRING,
        },
        donation_quantity:{
            type: DataTypes.INTEGER, 
        }
     },
    {
        timestamps: false
       }
    );
}