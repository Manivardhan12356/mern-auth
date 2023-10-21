import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utilis/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public

const authUser = asyncHandler(async (req, res) => {
   
   const { email, password } = req.body;
   const user = await User.findOne({ email })
   if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id)
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email
      })
   } else {
      res.status(401);
      throw new Error(` Invalid email or password`)
   }
 
})

export { authUser }



// @desc   Register user
// @route   POST /api/users/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;
   const userExists = await User.findOne({ email })
   
   if (userExists) {
      res.status(400);
      throw new Error(`User already exists`)
   }

   const user = await User.create({
      name,
      email,
      password
   })

   if (user) {
      generateToken(res,user._id)
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email
      })
   } else {
      res.status(400);
      throw new Error(` Invalid User data `)
   }
   
   res.status(200).json({ message: "Register  User" });
})

export { registerUser }




// @desc   Logout user
// @route   POST /api/users/LOGOUT
// @access  private

const LogutUser = asyncHandler(async (req, res) => {

   res.clearCookie('jwt', "", {
      httpOnly: true,
      expires : new Date(0)
   })
   res.status(200).json({ message: "Logout User sucessfully" });
})

export { LogutUser }


// @desc   Get user profile
// @route   Get/api/users/PROFILE
// @access  private

const gettUserProfile = asyncHandler(async (req, res) => {
   if (req.user) {
      res.json({
         _id: req.user._id,
         name: req.user.name,
         email: req.user.email,
      });
   } else {
      res.status(404);
      throw new Error('User not found');
   }
   res.status(200).json({ message: "User Profile" });
})

export { gettUserProfile }



// @desc   Update user profile
// @route   Put/api/users/updateProfile
// @access  private 
const updateUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);

   if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
         user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
      });
   } else {
      res.status(404);
      throw new Error('User not found');
   }
   res.status(200).json({ message: "update User Profile" });
})

export { updateUserProfile }