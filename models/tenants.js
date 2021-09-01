
const mongoose = require('mongoose');


const TenantsSchema = new mongoose.Schema({

    fisrtName:{type:String, require:true},
    lastName:{type: String, required:true },
    mail:{type: String, required:true },
    id:{type: Number, required:true }
});
module.exports = mongoose.model('tenants', TenantsSchema);
//module.exports = User;


/*const mongoose=require("mongoose");


const tenants = mongoose.model('tenants' , {
    username :{
        type: String,
        required: true,
        unique: true
    },
    password:{type: String,required:true },
    
    created:{type: Date, default: Date.now}
    
    
});

module.exports = tenants;*/