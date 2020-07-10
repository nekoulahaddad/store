const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("config");
const auth = require('../middleware/auth');

// log in
router.post('/',(req,res) => {
const {email,password} = req.body;
if (!email || !password) {
return res.status(400).json({msg : "please fill all things"});
}
User.findOne({email})
.then(user => {
	if (!user) return res.status(400).json({msg:"user not found"});
	bcrypt.compare(password,user.password)
	.then(isMath => {  // al compare byentoj 3anha boolean ya (yes : isMath) ya (no : !inMath )
     if (!isMath) return res.status(400).json({msg:"password not correct"});
     jwt.sign(
     	{id:user.id},
     	config.get("jwtsecret"),
     	{expiresIn:3600},
     	(err,token) => {
     		if (err) throw err;
     		res.json({
     			token,
     			 user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
     		})
     	}
     	)

 	})
})


});

router.get("/user",auth, (req,res) => {
User.findById(req.user.id)
.select("-password")    // hie mnshan sheel al password mn al response 
.then(user => res.json(user));


});


module.exports = router;  // ma b3ref lesh dayman 3m ysamy al module.exports (router) !!! 