const { verifyToken } = require("./generateToken");

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(409).send({ message: "Need authorization token!" });
    }
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    if (tokenData.user) {
      next();
    } else {
      res.status(409).send({ message: "User not have permissions!" });
    }
  } catch (error) {}
};

module.exports = {
  checkAuth,
};
