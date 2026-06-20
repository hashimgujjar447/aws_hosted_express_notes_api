import jwt from "jsonwebtoken";

export function generateAccessToken({ _id, email }) {
  return jwt.sign(
    { _id: _id, email: email },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" },
  );
}
