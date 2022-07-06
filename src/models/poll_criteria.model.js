const { DataTypes, Model } = require("sequelize");
const sequelize = require("../commons/database/database").sequelize;
const { TABLE_NAME } = require("../commons/constants/table_names");

class PollCriterias extends Model {}

PollCriterias.init(
    {
        criteria_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        poll_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        total_vote: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: TABLE_NAME.poll_criterias,

        // If don't want createdAt, updatedAt
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = { PollCriterias };
