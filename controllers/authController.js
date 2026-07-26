const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma");
const passport = require("passport");

function getSignUp(req, res, next) {
    try {
        res.render("sign-up", {
            errors: [],
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
}

async function postSignUp(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).render("sign-up", {
                errors: errors.array(),
                data: req.body,
            });
        }

        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        res.redirect("/log-in");
    }
    catch (error) {
        next(error);
    }
}

function getLogIn(req, res, next) {
    try {
        res.render("log-in", {
            errors: [],
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
}

function postLogIn(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).render("log-in", {
                errors: errors.array(),
                data: req.body,
            });
        }
        
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(401).render("log-in", {
                    errors: [
                        { msg: info.message}
                    ],
                    data: req.body
                });
            }
            
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                return res.redirect("/");
            });

        })(req, res, next);
    }
    catch (error) {
        next(error);
    }
}

module.exports = { 
    getLogIn, 
    getSignUp,
    postSignUp,
    postLogIn
};