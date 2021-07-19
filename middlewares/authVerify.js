const jwt = require("jsonwebtoken");
const secret = process.env['secret'];

const authVerify = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    req.user = { userId: decoded.userId };
    return next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Unauthorized access, please add the token" })
  }
};

module.exports = { authVerify };
