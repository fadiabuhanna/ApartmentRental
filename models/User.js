
const mongoose=require('mongoose');


const UserSchema = new mongoose.Schema({

    username:{type:String, required:true},
    password:{type: String,required:true },


    firstName:{type:String},
    lastName:{type: String },
    mail:{type: String },
    mobile:{type: Number},
    city:{type: String },
    numberCard:{type: Number},
    ThreeNumberCard:{type: Number},
    cardValidity:{type: String },
    EntryDate:{type: String },
    ReleaseDate:{type: String}    
    
    
});
module.exports = mongoose.model('User', UserSchema);

