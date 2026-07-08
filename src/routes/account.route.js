const express = require('express');
const router= express.Router();
const authMiddleware  = require('../middleware/auth.middleware');
const accountController= require('../controllers/account.controller');

const validation=authMiddleware.authMiddleware;
/**
 * -POST /api/accounts
 * -Create a new account 
 * -Protected Route
 */
router.post("/",validation,accountController.createAccountController);

/**
 * -GET /api/accounts/
 * - get all accounts of the logged-in user
 * Protected Routes
 */
router.get("/",validation,accountController.getUserAccountsController);

/**
 * -GET /api/accounts/balance/:accountId
 */

router.get("/balance/:accountId",validation,accountController.getAccountBalance);

module.exports=router;