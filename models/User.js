
const mongoose=require('mongoose');


const UserSchema = new mongoose.Schema({

    username:{type:String, required:true},
    password:{type: String,required:true },


    firstName:{type:String},
    lastName:{type: String },
    mail:{type: String },
    id:{type: Number },
    mobile:{type: Number},
    city:{type: String },
    numberCard:{type: Number},
    ThreeNumberCard:{type: Number},
    cardValidity:{type: String },
    EntryDate:{type: String },
    ReleaseDate:{type: String}    


    /*username :{
        type: String,
        required: true,
        unique: true
    },
    password:{type: String,required:true },
    
    created:{type: Date, default: Date.now}*/
    
    
});
module.exports = mongoose.model('User', UserSchema);
//module.exports = User;

