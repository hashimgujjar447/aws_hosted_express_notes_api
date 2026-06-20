import jwt from "jsonwebtoken";

export function generateRefreshToken({ _id, email }) {
  return jwt.sign(
    { _id: _id, email: email },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
}
