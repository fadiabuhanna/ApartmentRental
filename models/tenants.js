
const mongoose = require('mongoose');


const TenantsSchema = new mongoose.Schema({

    fisrtName:{type:String, require:true},
    lastName:{type: String, required:true },
    mail:{type: String, required:true },
    id:{type: Number, required:true }
});
module.exports = mongoose.model('tenants', TenantsSchema);