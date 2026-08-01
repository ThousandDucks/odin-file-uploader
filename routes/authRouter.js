const { Router } = require("express");

const authRouter = Router();
const authController = require("../controllers/authController");

const { validateSignUp, validateLogIn } = require("../middleware/validators/authValidators");

authRouter.get("/log-in", authController.getLogIn);
authRouter.get("/sign-up", authController.getSignUp);
authRouter.get("/check-username", authController.checkUsername);
authRouter.post("/sign-up", validateSignUp, authController.postSignUp);
authRouter.post("/log-in", validateLogIn, authController.postLogIn);
authRouter.post("/log-out", authController.logOut);

module.exports = authRouter;