function uploadFile(req, res, next) {
    try {
        console.log(req.file);

        res.redirect("/");
    } catch (error) {
        next(error);
    }
}

module.exports = {
    uploadFile
};