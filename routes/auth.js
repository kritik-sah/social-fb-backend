const router = require("express").Router();
const User = require("../modles/user");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
  try {
    //converting normal password to hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedpassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    //username
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).send("User not found");

    //password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).send("incorrect password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
