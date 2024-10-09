const admin = require("firebase-admin");
const firebaseServiceAccount = require("../firebase_secret.json");


admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount)
})

module.exports = {
    admin
}