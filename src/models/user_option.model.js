const { DataTypes, Model } = require("sequelize");
const sequelize = require("../commons/database/database").sequelize;
const { TABLE_NAME } = require("../commons/constants/table_names");

class UserOptions extends Model {}

UserOptions.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        option_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        sequelize,
        tableName: TABLE_NAME.user_options,

        // If don't want createdAt, updatedAt
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = { UserOptions };
