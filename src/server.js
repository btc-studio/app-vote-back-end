const Btcs = require("./btcs");
const app = require("./app");

const APP_PORT = process.env.APP_PORT || 3000;
const logger = Btcs.logger;

app.listen(APP_PORT, function () {
    logger.info(
        "BTC Studio Back-end Api Server is running on port %d.",
        APP_PORT
    );
});
