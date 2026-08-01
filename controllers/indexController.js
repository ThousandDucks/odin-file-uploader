const { prisma } = require("../lib/prisma");

function getIndex(req, res, next) {
    res.render("index");
}

module.exports = { getIndex };