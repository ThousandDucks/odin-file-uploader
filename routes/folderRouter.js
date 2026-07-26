const { Router } = require("express");
const folderController = require("../controllers/folderController");
const folderRouter = Router();

// folderRouter.get("/", folderController.createFolder);
folderRouter.post("/", folderController.createFolder)

module.exports = folderRouter;