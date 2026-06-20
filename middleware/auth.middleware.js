import jwt from "jsonwebtoken";
import { User } from "../modules/auth/auth.model.js";

export async function AuthMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }

    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      });
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET,
    );

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
