const Vendor = require("../models/Owner")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const VendorRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if the vendor already exists
        let vendoremail = await Vendor.findOne({ email });
        if (vendoremail) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new vendor
       const  newVendor = await Vendor.create({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save();

        res.status(200).json({
            success: true,
            message: "Registered Successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message,
        });
    }
};

// login 
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Checking fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required"
        });
      }
  
      // Fetch the user by email and retrieve the password field
      let user = await Vendor.findOne({ email }).select("+password");
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid Email"
        });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid Password"
        });
      }
       // token creation using jwt 
        const token = jwt.sign({vendorid : user._id}, process.env.secretkey, {expiresIn :"2h"} )
        console.log(token)
 
      // If login is successful
      res.status(200).json({
        success: true,
        message: `Welcome back ${user.username}`,
        token
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Login failed",
        error: error.message,
      });
    }
  };
//   get all vendors
const getAllUsers = async (req, res) => {
    try {
        const users = await Vendor.find({}); 
        const userData = users.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email
        }));
          totlalvendors = userData.length
        res.json({
            success: true,
            totlalvendors,
            users: userData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// get user
const getUser = (req, res) => {
    const { _id: id, email, username } = req.user; 
    res.status(200).json({
        success: true,
        user: {  _id, email,username}  
    });
};

module.exports = {
    VendorRegister,
    login,
    getAllUsers,
    getUser
}