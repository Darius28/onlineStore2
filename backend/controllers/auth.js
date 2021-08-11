import jwt from "jsonwebtoken";
import User from "../models/user";
import { comparePassword, hashPassword } from "../utils";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists.");
    }

    const hashedPassword = await hashPassword(password);

    const addUser = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found!");
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Incorrect Password.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, { httpOnly: true });
    user.password = undefined;
    res.send({ user });
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};
