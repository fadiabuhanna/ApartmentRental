const express = require("express");
const session = require("express-session");
const path = require('path')
const UserServices = require("../services/users");
const router = express.Router();

router.get("/adminLogin", (req, res) => {
	res.sendFile(path.resolve('pages/adminLogin.html'));
	
});



module.exports = router;