const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Admin = require("../models/adminModels"); 
const jwt = require("jsonwebtoken");

const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password, email , isAdmin } = req.body;
 

  // Check if all required fields are provided
   if (!username || !password || !email || !isAdmin) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if admin already exists
  const adminAvailable = await Admin.findOne({ email });
  if (adminAvailable) {
    res.status(400);
    throw new Error("Already registered");
  }

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  // Create the admin
  const admin = await Admin.create({
    username,
    email,
    password: hashPassword,
    isAdmin
  });
  
  // Send response
  if (admin) {
    res.status(201).json({ _id: admin.id, _email: admin.email });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
}); 

const loginAdmin = asyncHandler(async (req, res) => {
 
  const { email , password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const admin = await Admin.findOne({ email });
  if(admin && (await bcrypt.compare(password , admin.password))){
    const accessToken = jwt.sign({
      admin: {
        username: admin.username,
        email: admin.email,
        id: admin.id
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '200m'}
    );
    res.status(200).json({accessToken});
  }
});

const currentAdmin = asyncHandler(async (req, res) => {
  res.send( req.admin );
});

module.exports = { registerAdmin, loginAdmin, currentAdmin };
