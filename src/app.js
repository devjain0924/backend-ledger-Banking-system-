const express = require('express');
const cookieParser = require('cookie-parser');

/**
 * Routes Require
 */
const authRouter = require('./routes/auth.route');
const accountRouter = require('./routes/account.route');
const transactionRouter = require('./routes/transaction.route');

//instance of express is the server
const app = express();
app.use(express.json());
app.use(cookieParser());

/**
 * Use Routes
 */
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/transactions", transactionRouter);
module.exports = app;    