const { Router } = require("express");
const folderController = require("../controllers/folderController");
const { requireAuth } = require("../middleware/authMiddleware");
const folderRouter = Router();

folderRouter.use(requireAuth);

folderRouter.get("/", folderController.getFolder);
folderRouter.get("/:id", folderController.getFolder);

folderRouter.post("/", folderController.createFolder)
folderRouter.post("/:id/rename", folderController.renameFolder);
folderRouter.post("/:id/delete", folderController.deleteFolder);


module.exports = folderRouter;