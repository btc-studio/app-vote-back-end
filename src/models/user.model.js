const { DataTypes, Model } = require("sequelize");
const sequelize = require("../commons/database/database").sequelize;
const { TABLE_NAME } = require("../commons/constants/table_names");

class Users extends Model {}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },

        role: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },

        created_at: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        updated_at: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: TABLE_NAME.users,

        // If don't want createdAt, updatedAt
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = { Users };
