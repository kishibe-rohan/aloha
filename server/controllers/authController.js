const User = require("../models/User");
const bcrypt = require("bcrypt");

//Sign Up
exports.register = async (req, res) => {
  try {
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //Save to DB and send response
    const user = await newUser.save();
    res.status(200).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error while registering user", err });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    //check if the email entered belongs to an user
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User Not Found");

    //validate password
    const validPassword = await bcrypt.compare(req.body.password, user);
    !validPassword && res.status(400).json("Wrong Password");

    //Success
    res.status(200).json({
      message: "Login Successful",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error while logging in", err });
  }
};
