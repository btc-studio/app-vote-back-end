const { DataTypes, Model } = require("sequelize");
const sequelize = require("../commons/database/database").sequelize;
const { TABLE_NAME } = require("../commons/constants/table_names");

class Criterias extends Model {}

Criterias.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        tableName: TABLE_NAME.criterias,

        // If don't want createdAt, updatedAt
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = { Criterias };
