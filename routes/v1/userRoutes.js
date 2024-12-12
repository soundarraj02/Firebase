const router = require("express").Router();
const  userController  = require("../../controllers/userController");
const {requiresAuth,restrictTo,generateToken} = require("../../middlewares/fbAuthCheck");
const notificationController =require("../../controllers/notificationController");
const groupController = require("../../controllers/groupController");


// profile routes
router.get("/generate-token/:uid",generateToken);
router.get("/onboarding",requiresAuth,userController.Onboarding);
router.post("/updateUser",requiresAuth,userController.updateUser);
router.get("/getUserProfile", requiresAuth,restrictTo("user"),userController.getUserDetail);
router.delete("/deleteAccount", requiresAuth,restrictTo("user"), userController.deleteAccount);
router.post("/sendNotification",requiresAuth,notificationController.sendNotification)
router.post("/createGroup", requiresAuth, restrictTo("user"), groupController.createGroup);
router.get("/getAllGroups", requiresAuth, restrictTo("user"), groupController.getAllGroups);
router.patch("/addMembers", requiresAuth, restrictTo("user"), groupController.addMembers);

module.exports = router;    