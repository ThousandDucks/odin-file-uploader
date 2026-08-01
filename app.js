const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const LocalStrategy = require('passport-local').Strategy;

const expressSession = require('express-session');
require('dotenv/config');

const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { prisma } = require("./lib/prisma");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

// Stores login information so users don't need to relog everytime.
app.use(
  expressSession({
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000, // login details stored for 1 day
      secure: process.env.NODE_ENV === "production"
    },
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const fileRouter = require("./routes/fileRouter");
const folderRouter = require("./routes/folderRouter");

app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/files", fileRouter);
app.use("/folders", folderRouter);

const PORT = process.env.PORT || 3000;

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log(`app listening on port ${PORT}!`);
});

