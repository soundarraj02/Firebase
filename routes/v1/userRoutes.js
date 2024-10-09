const router = require("express").Router();
const {requiresAuth,restrictTo,generateToken} = require("../../middlewares/fbAuthCheck");


// profile routes
router.get("/generate-token/:uid",generateToken);

module.exports = router;