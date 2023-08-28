const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = "Gyana$ranjan$sahoo"
// create user using POST  "/api/auth/create-user"
router.post('/create-user',[
    // adding constraints
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
], async (req, res) => {
    // return bad request if the is any error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const salt = await bcrypt.genSalt(10);
        let success=true
        // check wheater the email is already existing
        const securedPassword = await bcrypt.hash(req.body.password,salt)
        let user = await User.findOne({email: req.body.email})
        if(user){
            success=false
            return res.status(400).json({success,error:"An user already exists with the same email"})
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword
        })
        const data = {
            user : {
                id: user.id,
            }
        }
        const authToken =  jwt.sign(data,JWT_SECRET);
        success=true
        res.json({success,authToken})
    }catch(error){
        console.error(error.message);
        res.status(500).send(success,"Internal Server Error");
    }
});


// Route-2 : Authenticate user using POST "api/auth/login" . No login required

router.post('/login',[
    // adding constraints
    body('email','This is not a valid email address').isEmail(),
    body('password','Password cannot be blank').exists(),
],async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body
    try{
        let user = await User.findOne({email})
        let success=false
        if(!user){
            return res.status(400).json({success, error: "Invalid Credentials"});
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(400).json({success, error: "Invalid Credentials"});
        }

        const payload = {
            user: {
                id: user.id,
            }
        }
        const authToken =  jwt.sign(payload,JWT_SECRET);
        success = true
        res.json({success,authToken});

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// Route-3 : Get Logged in user details using POST "api/auth/getuser" Login required
router.post('/getuser',fetchuser,async(req, res)=>{
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        // console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Update Profile using PUT "/api/auth/update-profile/:id" Login required
router.put('/update-profile/:id', fetchuser, [
    // adding constraints
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
], async (req, res) => {
    // return bad request if there is any error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Error occured due to email problem")
        return res.status(400).json({ success: false, error: "Invalid input. Please fill the info correctly!!! " });
    }
    
    const userId = req.params.id; // Get the user ID from URL parameter

    // Check if the user exists
    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
    // Check if another user with the same email exists
    let otherUser = await User.findOne({ email: req.body.email });
    if (otherUser) {
        // res.status(400).send("duplicate Error")
        return res.status(400).json({ success: false, error: "An user already exists with the same email" });
    }
    try {
        // Update user fields
        let user = await User.findById(userId);
        user.name = req.body.name;
        user.email = req.body.email;
        
        // Save the updated user
        await user.save();

        res.status(200).json({ success: true, message: "Profile updated successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
});

module.exports = router;
