const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Message",{
      
        message_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        message_issue:{
            type:DataTypes.STRING,
            allowNull: false,
        },    
        message_content:{
            type:DataTypes.TEXT,
            allowNull: false,
        } ,
        message_email :{
            type: DataTypes.STRING, 
            allowNull: false,
        },
        message_answered :{
            type: DataTypes.BOOLEAN, 
            defaultValue: false,
            allowNull:false 
        }
     },
    {
        timestamps: false
       }
    );
}