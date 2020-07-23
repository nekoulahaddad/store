const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const UserSchema = new Schema({
name : {
	type : String,
	required : true
},
email : {
	type : String,
	required : true,
	unique : true
},
password : {
	type : String,
	required : true
},
lastname : {
	type : String,
	default: '' ,
	maxlength : 20
},
cart : {
	type: Array,
	default: []
},
sex: { 
	type: String, 
	default: '' 
},
phone: { 
	type: String, 
	default: '' 
},
images : {
	type: Array,
    default: []
},
history : {
	type: Array,
	default: []
},
tokenExp : {
	type : Number
},
date : {
	type : Date
}
});

module.exports = User = mongoose.model("user",UserSchema)
