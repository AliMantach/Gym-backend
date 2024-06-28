const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModels"); 
const jwt = require("jsonwebtoken");
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
 

  // Check if all required fields are provided
   if (!username || !password || !email) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user already exists
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Already registered");
  }

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });
  
  // Send response
  if (user) {
    res.status(201).json({ _id: user.id, _email: user.email });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
}); 

const loginUser = asyncHandler(async (req, res) => {
 
  const { email , password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const user = await User.findOne({ email });
  if(user && (await bcrypt.compare(password , user.password))){
    const accessToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user.id
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '30m'}
    );
    res.status(200).json({accessToken});
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.send( req.user );
});

module.exports = { registerUser, loginUser, currentUser };
