const User = require("../model/userModel");
const brcypt = require("bcrypt");


// for register purpose
module.exports.register = async (req, res, next) => {
  try {
    // all the data
    // getting data that enteredd by the user
    console.log(req.body);
    const { username, email, password } = req.body;

    //checking username
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "username already used", status: false });

    // checking email
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "email already used", status: false });

    // hashing password
    const hashedPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};


// for login purposes
module.exports.login = async (req, res, next) => {
  try {
    // all the data
    // getting data that enteredd by the user
    console.log(req.body);
    const { username, password } = req.body;

    //checking username
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect username or password", status: false });

    const isPasswordVaild = await brcypt.compare(password, user.password)
    if(!isPasswordVaild)
     return res.json({msg: "Incorrect username or password", status: false})
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async function(req,res,next) {
   try {
     const userId = req.parms.id;
     const avatarImage = req.body.image;
     const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
     })
   } catch(ex) {

   }
}