const authDao = require("../daos/auth.dao");
const passportUtils = require("../utils/passportUtils");

const registerUser = async (req, res) => {
  console.log(req.body);
  const saltHash = passportUtils.genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const user = await authDao.registerUser(req.body, salt, hash);
  if (user) {
    const jwt = passportUtils.issueJWT(user);
    res.json({
      success: true,
      user,
      token: jwt.token,
      expiresIn: jwt.expires,
    });
  } else {
    res.json({
      success: false,
    });
  }
};

const logInUser = async (req, res) => {
  try {
    const user = await authDao.findUserByName(req.body.userName);
    if (!user)
      res.status(401).json({ success: false, msg: "Could not find the user" });
    const isValid = passportUtils.validatePassword(
      req.body.password,
      user.hash,
      user.salt
    );
    if (isValid) {
      const tokenObj = passportUtils.issueJWT(user);
      res.status(200).json({
        success: true,
        user,
        token: tokenObj.token,
        expiresIn: tokenObj.expires,
      });
    } else
      res.status(401).json({
        success: false,
        msg: "Wrong password",
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Failure", message: "Server Error" });
  }
};

const protectedRoute = (req, res) => {
  res.status(200).json({ msg: "Authenticated" });
};

const authController = {
  registerUser,
  logInUser,
  protectedRoute,
};

module.exports = authController;
