const express = require("express");
const session = require("express-session");
const path = require('path')
const UserServices = require("../services/users");
const router = express.Router();

router.get("/adminLogin", (req, res) => {
	res.sendFile(path.resolve('pages/adminLogin.html'));
	
});

router.get("/customer-info", (req, res) => {
	res.sendFile(path.resolve('pages/customer-info.html'));
	
});

function isAuthorized(req, res, next){
	if(req.session.user){
		return next();
	}
	res.redirect(req.baseUrl + "/login");
}


/** should return a login page */
router.get("/login", (req, res) => {
	res.sendFile(path.resolve('pages/login.html'));
	
});

/** should handle login logic and redirect to homepage if needed */
router.post("/login", async(req, res) => {
	console.log(req.body)
	const{username,password} = req.body;
	
	const user = await UserServices.findByName(username);

	if(!user || user.password !== password){
		return res.redirect(req.baseUrl +"/login");
	}

	req.session.user=user;
	req.session.save()
	res.redirect(req.baseUrl);
});

/** should return a register page */
router.get("/register", (req, res) => {
	res.sendFile(path.resolve('pages/register.html'));
	
});




/** should handle register logic, log in the user, and redirect to homepage */
router.post("/register", async (req, res) => {
	
	const {username, password} = req.body;
	
	try{
		const user = await UserServices.addUser(username, password);
		req.session.user = user;
		res.redirect(req.baseUrl);
	}
	catch(err){
		console.error(err);
		res.redirect(req.baseUrl + "/register");
	}
});

/** should handle logout logic and redirect to homepage */
router.get("/logout", (req, res) => {
	req.session.destroy();
	res.redirect("/");
});
/** should return account page  - only logged in users can see this page*/
router.get("/", isAuthorized, async (req, res) => {

	if(!req.session.user){
		return res.redirect(req.baseUrl + "/login");
	}

	res.sendFile(path.resolve('pages/ApartmentRental.html'));
});

router.delete('/:username', (req, res)=>{ });
router.put('/:username', (req, res)=>{ });
module.exports = router;