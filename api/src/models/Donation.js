const { DataTypes, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Donation",{
      
        donation_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        donation_name:{
            type:DataTypes.STRING,
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