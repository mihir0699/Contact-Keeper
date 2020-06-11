const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

router.post('/',[
	check('name', 'Name is required')
	.not()
	.isEmpty(), 
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Please enter a passsord with 6 or more characters').isLength({min:6})
	], async (req,res)=>{
	
	const err= validationResult(req);
	if(!err.isEmpty())
	{
		return res.status(400).json({errors:err.array()});
	}
	const {name, email, password} = req.body;

	try{
		let user = await User.findOne({email:email});
		if(user)
		 return	res.status(400).json({msg:'User already exists'});

		user = new User({
			name, 
			email, 
			password
		})

		  const salt = await bcrypt.genSalt(10);
      	user.password = await bcrypt.hash(password, salt);
		await user.save();
		
		const payload = {
			user:{
				id: user.id
			}
		}
		jwt.sign(payload,config.get('jwtSecret'), {
			expiresIn : 3600
		},
		(err, token)=>{
			if (err) throw err;
			res.json(token);
		}
		)

	} catch(err){
		console.log(err);
		res.status(400).json("Err");
	}
})


module.exports = router;