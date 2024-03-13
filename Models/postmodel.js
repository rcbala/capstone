import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  user: {
    type: ObjectId,
    ref: "user",
  },
});

const Notes = mongoose.model("notes", NotesSchema);

export default Notes;
