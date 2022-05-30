const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registrationValidation, loginValidation } = require("../validation");

// VALIDATION
router.post("/register", async (req, res) => {
  // Validate the user input
  const { error } = registrationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the user exists in the DB
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).send("email already in use, please log in.");

  //Else: HASH the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //And then create new user
  const { name, email } = req.body;
  const user = User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(201).send("User created");
});

//LOGIN

router.post("/login", async (req, res) => {
  // Validate the user input
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user exists in DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email not found");

  // Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("inavlid password");

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
