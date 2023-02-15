const { DataTypes, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Donation",{
      
        donation_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: DataTypes.STRING,
      info: DataTypes.STRING
     }, {
        associate: function (db) {
          Donation.hasMany(db.User);
        },
      
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