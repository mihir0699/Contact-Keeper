const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/Users');
const auth = require('../middleware/auth');
const Contact = require('../models/Contacts');

router.get('/',auth, async (req,res)=>{
	try{
		const contacts = await Contact.find({ user: req.user.id }).sort({date:-1});
		res.json(contacts);
	} catch (err)
	{
		console.log(err);
	}
})

router.post('/',[auth, [
	check('name', 'Name is required').not().isEmpty(),
	]], async (req,res)=>{
		const err= validationResult(req);
	if(!err.isEmpty())
	{
		return res.status(400).json({errors:err.array()});
	}
	const {name, email, phone,type} = req.body;

	try{
		const newcontact = new Contact ({
			name, email, phone, type,user : req.user.id
		})
		const contact = await newcontact.save();
		res.json(contact);

	} catch (err)
	{
		console.log(err);

	}
	
})

router.put('/:id',auth, async (req,res)=>{
	const {name, email, phone,type} = req.body;
	const contactfield = {};
	if(name) contactfield.name = name;
	if(email) contactfield.email = email;
	if(phone) contactfield.phone = phone;
	if(type) contactfield.type = type;

	try{
		let contact = await Contact.findById(req.params.id);
		if(!contact)
			res.status(404).json("Contact not found");
		if(contact.user.toString()!== req.user.id)
		{
			return res.status(401).json({msg:"Not Authorized"});
		}

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {$set: contactfield},
      {new: true},
    )
      res.json(contact);
  } catch(err)
  {
  	console.log(err);
  }
		
	
})

router.delete('/:id',auth, async (req,res)=>{
	try{
		let contact = await Contact.findById(req.params.id);
		if(!contact)
			res.status(404).json("Contact not found");
		if(contact.user.toString()!== req.user.id)
		{
			return res.status(401).json({msg:"Not Authorized"});
		}

    await Contact.findByIdAndRemove(req.params.id);
      res.json("Contact Removed");
  } catch(err)
  {
  	console.log(err);
  }
})

module.exports = router;