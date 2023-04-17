const { tokenSign } = require("../middleware/generateToken");
const { compare } = require("../helpers/handleBcrypt");
const userModel = require("../models/user")

/**
 * @description Create new user
 * @param {String} email to user
 * @param {String} password to user
 */
const loginUser = async (email, password) => {
  try {
    const user = await userModel.findOne({ email, status: "Activo" }).lean();
    if (!user) {
      return { status: 404, message: "User not found!" };
    }
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      return { status: 403, message: "Password and user don't match!" };
    }
    delete user.password;
    delete user.address;
    delete user.phone;
    const token = await tokenSign(user);
    return { status: 200, message: "Login success!", user, token };
  } catch (error) {
    return { status: 500, message: error };
  }
};

module.exports = {
  loginUser,
};
