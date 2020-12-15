const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongousername: process.env.MONGODB_USERNAME,
  mongopassword: process.env.MONGODB_PASSWORD,
  mongoclusterurl: process.env.MONGODB_CLUSTERURL,
  mongodbanme: process.env.MONGODB_DBNAME
};