const { DataTypes, Model } = require("sequelize");
const sequelize = require("../commons/database/database").sequelize;
const { TABLE_NAME } = require("../commons/constants/table_names");

class UserWallets extends Model {}

UserWallets.init(
    {
        user_id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
        },

        blockchain_type: {
            type: DataTypes.STRING(256),
            primaryKey: true,
        },

        wallet_address: {
            type: DataTypes.STRING(256),
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

module.exports = { UserWallets };
