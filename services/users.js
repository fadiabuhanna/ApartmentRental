
const UserModel = require('../models/User');

class UsersService {
	
	constructor() {}
	
	// add a new user
	async addUser(username, password) {

		const user = await this.findByName(username);

		if (user) {
			throw new Error("username allready taken");
		}
		const newUser = await UserModel.create({username,password});
		
		return newUser;
		
	}


	// find and return a user by username
	async findByName(username) {
		return await UserModel.findOne({username});
	}

	// find and return a user by id
	async findById(id) {

		return await UserModel.findById(id);	
	}

}



module.exports = new UsersService();