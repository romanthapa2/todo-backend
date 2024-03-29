const User = require("../modules/users");
const express = require("express");
const router = express.Router();
// bcrypt helps to secure the password
const bcrypt = require("bcryptjs");
// to check the data given by the user is correct or not and return message if not we
// use validation
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwt_secret = "romanthapaand@";
const fetchuser=require("../middleware/fetchuser");


// route 1 create user endpoint
router.post(
  "/createuser",
  //requirements
  [
    body("name", "name must be atleast 3 charecters").isLength({ min: 3 }),
    body("email", "email must be unique.").isEmail(),
    body("password", "password should be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false;
    // req is the requested by user and res is what user recieves
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      // try checking if there is an email which already exits
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "user already exits" });
      }
      // for hash password
      const salt = await bcrypt.genSaltSync(10);
      var hash = await bcrypt.hashSync(req.body.password, salt);
      // create user like name email
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      const data = {
        user: {
          _id: user._id,
        },
      };
      success=true;
      const jwt_data = jwt.sign(data, jwt_secret);
      res.json({success, token: jwt_data });
      // this sends the data to the user
      // res.json(user);
    } catch (error) {
      // if other error comes it catches error and send to the user
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);



// route 2 autheticate a  user using login endpoint
router.post(
  "/login",
  //requirements
  [
    body("email", "please enter valid email").isEmail(),
    body("password", "plese enter valid password").exists(),
  ],

  async (req, res) => {
    // req is the requested by user and res is what user recieves
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res.status(400).json({ error: "please correct credencials" });
      }
      const comparepassword = await bcrypt.compare(password, user.password);
      if (!comparepassword) {
        return res
          .status(400)
          .json({ success,error: "please enter correct credencials" });
      }
      const data = {
        user: {
          _id: user._id,
        },
      };
      const jwt_data = jwt.sign(data, jwt_secret);
      success=true;
      res.json({success, token: jwt_data });
    } catch (error) {
      // if other error comes it catches error and send to the user
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// route 3 get users logdin users detail
router.post(
  "/getuser",fetchuser,async (req, res) => {
    try{
      user_id=req.user._id;
      const user = await User.findById(user_id).select("-password");
      res.send(user)
    }catch(error){
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  })
module.exports = router;

