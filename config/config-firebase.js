const admin = require('firebase-admin');

const defaultApp = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://case-study-70877.firebaseio.com"
});

var defaultDatabase = defaultApp.database();
module.exports = defaultDatabase.ref("/");