const Sequelize = require("sequelize");
const Btcs = require("../../btcs");

const logger = Btcs.logger;

if (!process.env.RDS_DB_NAME) {
    console.log("Error: Missing database name!");
    process.exit(1);
}

if (!process.env.RDS_HOSTNAME) {
    console.log("Error: Missing database host!");
    process.exit(1);
}

if (!process.env.RDS_USERNAME) {
    console.log("Error: Missing database username!");
    process.exit(1);
}

if (!process.env.RDS_PORT) {
    process.env.RDS_PORT = 5432;
}

// Initialize Database connection
const sequelize = new Sequelize(
    process.env.RDS_DB_NAME,
    process.env.RDS_USERNAME,
    process.env.RDS_PASSWORD,
    {
        host: process.env.RDS_HOSTNAME,
        port: process.env.RDS_PORT,
        dialect: "postgres",
        logging: (msg) => logger.debug(msg),
        logging: console.log,
    }
);

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = {
    sequelize: sequelize,
    connect: connect,
};
