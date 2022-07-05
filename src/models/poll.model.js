const { DataTypes, Model } = require("sequelize");
const sequelize = require("../commons/database/database").sequelize;
const { TABLE_NAME } = require("../commons/constants/table_names");

class Polls extends Model {}

Polls.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        start_at: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        end_at: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        created_by: {
            type: DataTypes.INTEGER(11),
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
        tableName: TABLE_NAME.polls,

        // If don't want createdAt, updatedAt
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = { Polls };
