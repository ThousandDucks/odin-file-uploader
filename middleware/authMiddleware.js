function redirectIfAuthenticated(req, res, next) {
    if (req.user) {
        return res.redirect("/folders");
    }

    next();
}

function requireAuth(req, res, next) {
    if (!req.user) {
        return res.redirect("/log-in");
    }

    next();
}

module.exports = {
    redirectIfAuthenticated,
    requireAuth
};