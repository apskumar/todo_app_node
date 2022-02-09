const express = require("express");
const router = express.Router()
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const { check, validationResult } = require('express-validator');
const User = require("../../models/User");

router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('email','Please incluse valid email').isEmail(),
    check('password','Please end password more than 6 char').isLength({ min:6 })
],async(req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try{
        let user = await User.findOne({ email })

        if(user){
            res.status(400).json({ errors: [ { msg: 'User already exits' }] })
        }

        const avatar = "avatar.jpg"

        user = new User({ name,email,avatar,password })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt);

        await user.save()

        const payload = {
            user : {
               id:user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),{ expiresIn :3600000 },(err,token)=>{ 
            if(err) throw err
            res.json({ token })
         })

        // res.send('User Saved SuccessFully')

    }catch(err){      
        console.log(err.message)
        res.send(500).send('server error')
    }

    // res.send('User Routers')
})

router.get('/',(req,res)=>res.send('User Routers'))


module.exports = router