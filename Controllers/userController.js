import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

export function getByEmail(req) {
  return User.findOne({
    email: req.body.email,
  });
}

export function generateToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY);
}

export function getUserById(userId) {
  return User.findById(userId).select("_id username email");
}
