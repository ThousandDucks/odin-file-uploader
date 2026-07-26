const { Router } = require("express");
const multer = require("multer");
const fileController = require("../controllers/fileController");

const fileRouter = Router();

const upload = multer({dest: "uploads/"});

fileRouter.post(
    "/upload",
    upload.single("file"),
    fileController.uploadFile
);

module.exports = fileRouter;