const { Router } = require("express");
const upload = require("../middleware/validators/uploadFile");
const fileController = require("../controllers/fileController");

const fileRouter = Router();


fileRouter.get("/:fileId/download", fileController.downloadFile);
fileRouter.get("/:id", fileController.viewFile);

fileRouter.post(
    "/upload",
    (req, res, next) => {
        upload.single("file")(req, res, function(error) {
            if (error) {
                let message = error.message;

                if (error.code === "LIMIT_FILE_SIZE") {
                    message = "File is too large. Maximum size is 10MB.";
                }

                if (req.body.folderId) {
                    return res.redirect(
                        `/folders/${req.body.folderId}?error=${encodeURIComponent(message)}`
                    );
                }

                return res.redirect(
                    `/folders?error=${encodeURIComponent(message)}`
                );
            }

            next();
        });
    },
    fileController.uploadFile
);

fileRouter.post("/:fileId/delete", fileController.deleteFile);

module.exports = fileRouter;