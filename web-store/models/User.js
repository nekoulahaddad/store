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
	maxlength : 20
},
cart : {
	type: Array,
	default: []
},

image : {
	type : String
},
history : {
	type: Array,
	default: []
},
tokenExp : {
	type : Number
},
date : {
	type : Date,
	default : Date.now
}
});

module.exports = User = mongoose.model("user",UserSchema)
