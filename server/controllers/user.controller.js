const userDao = require("../daos/user.dao");
const passportUtils = require("../utils/passportUtils");

const addUser = async (req, res) => {
  const user = await userDao.findUserByName(req.body.userName);
  if (user)
    res.status(400).json({ success: false, msg: "User already exists!" });
  const saltHash = passportUtils.genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const data = await userDao.addUser(req.body, salt, hash);
  res.status(200).json({ success: true, data });
};

const findUsers = async (req, res) => {
  try {
    const data = await userDao.findUsers();
    if (data.length === 0)
      res.status(200).json({ status: "Success", data: [] });
    res.status(200).json({ status: "Success", data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Failure", message: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userDao.findUserById(req.body._id);
    if (!user)
      res.status(401).json({ success: false, msg: "Could not find the user" });
    const data = await userDao.updateUser(req.body, user.hash, user.salt);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Failure", message: "Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await userDao.findUserById(req.params.id);
    if (!data) res.status(404).json("Not found!");
    const user = await userDao.deleteUser(req.params.id);
    res.status(200).json({ status: "Success", data: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Failure", message: "Server Error" });
  }
};

const userController = {
  addUser,
  findUsers,
  updateUser,
  deleteUser,
};

module.exports = userController;
