import { loginUser, registerUser } from "./auth.service.js";
import { generateAccessToken } from "../../utils/generateAccessToken.js";
import { generateRefreshToken } from "../../utils/generateRefreshToken.js";

export async function Login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await loginUser({
      email,
      password,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken({
      _id: user._id,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      _id: user._id,
      email: user.email,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // production me true
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function Register(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser({
      name,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function Logout(req, res) {
  try {
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
