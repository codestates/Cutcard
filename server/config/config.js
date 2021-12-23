const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: process.env.PORT,
  },
  test: {
    username: process.env.DATABASE_RDS_USERNAME,
    password: process.env.DATABASE_RDS_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: process.env.PORT,
  },
  production: {
    username: process.env.DATABASE_RDS_USERNAME,
    password: process.env.DATABASE_RDS_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: process.env.PORT,
  },
};
