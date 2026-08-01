const { Router } = require("express");

const indexRouter = Router();
const indexController = require("../controllers/indexController");
const { redirectIfAuthenticated } = require("../middleware/authMiddleware");

indexRouter.get(
    "/",
    redirectIfAuthenticated,
    indexController.getIndex
);

module.exports = indexRouter;