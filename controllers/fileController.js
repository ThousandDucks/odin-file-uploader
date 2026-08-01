const { prisma } = require("../lib/prisma");
const cloudinary = require("../lib/cloudinary");

async function uploadFile(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        const userId = req.user.id;
        const folderId = req.body.folderId || null;

        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "raw",
                    public_id: req.file.originalname
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            stream.end(req.file.buffer);
        });

        const file = await prisma.file.create({
            data: {
                name: req.file.originalname,
                url: uploadResult.secure_url,
                size: req.file.size,
                mimeType: req.file.mimetype,
                userId,
                folderId
            }
        });

        console.log(file);

        if (folderId) {
            res.redirect(`/folders/${folderId}`);
        } else {
            res.redirect("/folders");
        }

    } catch (error) {
        next(error);
    }
}



async function downloadFile(req, res, next) {
    try {
        const file = await prisma.file.findUnique({
            where: {
                id: req.params.fileId
            }
        });

        if (!file) {
            return res.status(404).send("File not found");
        }

        const downloadUrl = file.url.replace(
            "/upload/",
            "/upload/fl_attachment/"
        );

        res.redirect(downloadUrl);

    } catch (error) {
        next(error);
    }
}

async function deleteFile(req, res, next) {
    try {
        const file = await prisma.file.findUnique({
            where: {
                id: req.params.fileId
            }
        });

        if (!file) {
            return res.status(404).send("File not found");
        }


        await prisma.file.delete({
            where: {
                id: file.id
            }
        });

        const folderId = req.body.folderId;

        if (folderId) {
            res.redirect(`/folders/${folderId}`);
        } else {
            res.redirect("/folders");
        }
    } catch (error) {
        next(error);
    }
}

async function viewFile(req, res, next) {
    try {
        const file = await prisma.file.findUnique({
            where: {
                id: req.params.id
            }
        });

        if (!file) {
            return res.status(404).send("File not found");
        }

        res.redirect(file.url);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    uploadFile,
    downloadFile,
    deleteFile,
    viewFile
};

