const { DataTypes, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Doc",{
        doc_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        doc_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        doc_topic:{
            type:  DataTypes.STRING,
            allowNull: false
        },
        doc_views:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        doc_author:{
            type: DataTypes.STRING,
        },
        doc_content:{
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        doc_image:{
            type: DataTypes.STRING,
            defaultValue: "https://thumbs.dreamstime.com/b/document-icon-vector-stack-paper-sheets-illustration-131104983.jpg"
        },
        doc_deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
       },
       
       {
        timestamps: false
       }
    
    );
}