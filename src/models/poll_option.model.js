const { DataTypes, Model } = require("sequelize");
const sequelize = require("../commons/database/database").sequelize;
const { TABLE_NAME } = require("../commons/constants/table_names");

class PollOptions extends Model {}

PollOptions.init(
    {
        criteria_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        option_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: TABLE_NAME.poll_options,

        // If don't want createdAt, updatedAt
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = { PollOptions };
