
const express = require("express");
const session = require("express-session");
const path = require('path')
const UserServices = require("../services/users");
const router = express.Router();



/** should return a customer-info page */
router.get("/customer-info", (req, res) => {
	res.sendFile(path.resolve('pages/customer-info.html'));
	
});

module.exports = router;