require("dotenv").config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const REDIS_DEV_CLIENT_URL = process.env.REDIS_DEV_CLIENT_URL;
const REDIS_PROD_CLIENT_URL = process.env.REDIS_PROD_CLIENT_URL;

module.exports = {
  PORT,
  NODE_ENV,
  REDIS_DEV_CLIENT_URL,
  REDIS_PROD_CLIENT_URL,
};
