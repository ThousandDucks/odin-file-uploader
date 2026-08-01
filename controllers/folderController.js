const { prisma } = require("../lib/prisma");
const formatFileSize = require("../utils/formatFileSize");

async function createFolder(req, res, next) {
    try {
        const folderName = req.body.folderName;
        const userId = req.user.id;
        const parentId = req.body.parentId || null;

        console.log(req.body);
        console.log(parentId);

        const folder = await prisma.folder.create({
            data: {
                name: folderName,
                userId: userId,
                parentId: parentId
            }
        });

        console.log(folder);

        if (parentId) {
            res.redirect(`/folders/${parentId}`);
        } else {
            res.redirect("/folders");
        }
    }
    catch (error) {
        next(error);
    }
}

async function getFolder(req, res, next) {
    try {
        const userId = req.user.id;
        const folderId = req.params.id || null;

        const sidebarFolders = await prisma.folder.findMany({
            where: {
                userId: userId,
                parentId: null
            }
        });

        const sidebarFiles = await prisma.file.findMany({
            where: {
                userId: userId,
                folderId: null
            }
        });

        const contentFolders = await prisma.folder.findMany({
            where: {
                userId: userId,
                parentId: folderId
            }
        });

        const contentFiles = await prisma.file.findMany({
            where: {
                userId: userId,
                folderId: folderId
            }
        });

        const breadcrumbs = [];

        if (folderId) {
            let currentFolder = await prisma.folder.findUnique({
                where: {
                    id: folderId
                }
            });

            while (currentFolder) {
                breadcrumbs.unshift(currentFolder);

                if (!currentFolder.parentId) {
                    break;
                }

                currentFolder = await prisma.folder.findUnique({
                    where: {
                        id: currentFolder.parentId
                    }
                });
            }
        }

        res.render("dashboard", {
            sidebarFolders,
            sidebarFiles,
            contentFolders,
            contentFiles,
            breadcrumbs,
            currentFolderId: folderId,
            user: req.user,
            formatFileSize,
            error: req.query.error
        });

    } catch (error) {
        next(error);
    }
}


async function renameFolder(req, res, next) {
    try {
        const folderId = req.params.id;
        const folderName = req.body.folderName;

        await prisma.folder.update({
            where: {
                id: folderId
            },
            data: {
                name: folderName
            }
        });

        res.redirect(req.get("Referrer") || "/folders");
    } 
    catch (error) {
        next(error);
    }
}

async function deleteFolder(req, res, next) {
    try {
        const folderId = req.params.id;

        await prisma.folder.delete({
            where: {
                id: folderId
            }
        });

        res.redirect("/folders");
    } 
    catch (error) {
        next(error);
    }
}

module.exports = { 
    createFolder,
    getFolder,
    renameFolder,
    deleteFolder
};