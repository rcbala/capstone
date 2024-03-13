import { populate } from "dotenv";
import Notes from "../Models/postmodel.js";

export function getAllBlog() {
  return Notes.find().populate("user", "username");
}

export function getUserBlog(req) {
  return Notes.find({ user: req.user._id }).populate("user", "username");
}

export function createBlog(req) {
  const posDate = new Date().toJSON().slice(0, 10);

  return new Notes({
    ...req.body,
    date: posDate,
    user: req.user._id,
  }).save();
}

export function UpdateBlog(req) {
  return Notes.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
}

export function deleteBlog(req) {
  return Notes.findByIdAndDelete({ _id: req.params.id });
}
