const dotenv = require('dotenv');
dotenv.config();

var admin = require("firebase-admin");

var serviceAccount = require("./admin-firebase");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket

});


const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })

module.exports = {
    admin,db,serviceAccount
};