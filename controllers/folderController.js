const { prisma } = require("../lib/prisma");

async function createFolder(req,res,next) {

    try {
        const folderName = req.body.folderName;
        const userId = req.user.id;

        const folder = await prisma.folder.create({
            data: {
                name: folderName,
                userId: userId 
            }
        })

        console.log(folder);
        res.redirect("/folders");
    }
    catch (error) {
        next(error);
    }
}

async function getFolder(req, res, next) {
    try {
        const userId = req.user.id;
        const folders = await prisma.folder.findMany({
            where: {
                userId: userId,
                parentId: null 
            }
        });
        // Get user id ---> Find root folder by looking for undefined/null parent id
        res.render("dashboard", { folders, user: req.user });
    }
    catch (error) {
        next(error);
    }
}

async function renameFolder(req, res, next) {
    try {
        const { folderId, folderName } = req.body;

        await prisma.folder.update({
            where: {
                id: folderId
            },
            data: {
                name: folderName
            }
        });

        res.redirect("/folders");
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