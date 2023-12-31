const User = require("../model/userModel")
const bcrypt = require("bcrypt")


module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used!", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used!", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "Account does not exist on this email! Please create a new account or use another email.", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });

  } catch (err) {
    next(err);
  }
};

module.exports.users = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
      "profilePic"
    ]);
    return res.json(users);
  }
  catch (err) {
    next(err)
  }
}

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    // onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};