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
      from: req.body.from,
      genre: req.body.genre,
    });

    //Save to DB and send response
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error while registering user", err });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    //check if the email entered belongs to an user
    // console.log(req.body.email);
    //console.log(req.body.password);
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User Not Found");

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong Password");

    //Success
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error while logging in", err });
  }
};
