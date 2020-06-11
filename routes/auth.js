const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../middleware/auth');


router.get('/',auth, async (req,res)=>{
	try{
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch(err)
	{
		res.json(user);
	}
})

router.post('/',[
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Password is required').exists()
	], async (req,res)=>{
		const err= validationResult(req);
	if(!err.isEmpty())
	{
		return res.status(400).json({errors:err.array()});
	}
	
	const {email, password} = req.body;
    
    try{
    	let user = await User.findOne({email})
    	if(!user)
    	return  res.status(400).json({msg: 'Invalid Credentials'});
    	
    	const isMatch = await bcrypt.compare(password, user.password);
    	if(!isMatch)
    		return res.status(500).json("Invalid Password");

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
		console.log(err.message);
		res.status(400).json("Err");
	}

    
})

module.exports = router;