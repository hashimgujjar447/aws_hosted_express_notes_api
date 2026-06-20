import { User } from "./auth.model.js";

export const loginUser = async ({ email, password }) => {
  const userData = await User.findOne({
    email,
  });

  if (!userData) {
    return null;
  }

  const isMatch = await userData.comparePassword(password);

  if (!isMatch) {
    return null;
  }

  const user = userData.toObject();
  delete user.password;

  return user;
};

export async function registerUser({ name, email, password }) {
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
}
