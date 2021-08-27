const router = require("express").Router();
const User = require("../modles/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("best of luck Kritik");
});

// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        //converting normal password to hashed password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("your details have been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can update only your account");
  }
});
// delete user
// get a user
//follow a user
//unfollow a user

module.exports = router;
