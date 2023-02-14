const { DataTypes, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("User",{
        internal_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        user_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_image:{
            type: DataTypes.STRING
        },
        user_type:{
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user"
        },
        user_state:{
            type: DataTypes.ENUM("warned", "banned", "active"),
            defaultValue: "active"
        },
        user_deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }
    );
}