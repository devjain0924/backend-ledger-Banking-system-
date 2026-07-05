const express = require('express');
const cookieParser = require('cookie-parser');

/**
 * Routes Require
 */
const authRouter = require('./routes/auth.route');
const accountRouter = require('./routes/account.route');


const app = express();
app.use(express.json());
app.use(cookieParser());

/**
 * Use Routes
 */
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);
module.exports = app;    