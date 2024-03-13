import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DbConnection/dbConfig.js";
import { UserRouter } from "./Routes/userRoutes.js";
import { NotesRouter } from "./Routes/postRoutes.js";
import isAuthenticated from "./Middleware/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
connectDB();

app.use("/blog/user", UserRouter);
app.use("/blog/notes", isAuthenticated, NotesRouter);

app.listen(port, () => {
  console.log("my app runing in", port);
});
