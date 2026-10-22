import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Please login to continue.",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!token_decode || !token_decode.id) {
      return res.json({
        success: false,
        message: "Invalid session. Please login again.",
      });
    }

    req.body = req.body || {};
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "Session expired or invalid token. Please login again.",
    });
  }
};

export default authUser;