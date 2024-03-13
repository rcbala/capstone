import express from "express";
import {
  UpdateBlog,
  createBlog,
  deleteBlog,
  getAllBlog,
  getUserBlog,
} from "../Controllers/postController.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const notes = await getAllBlog(req);

    if (notes.length <= 0) {
      res.status(404).json({ error: "No Data Available" });
    }
    res.status(200).json({
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "internal Server error",
    });
  }
});

router.get("/user/data", async (req, res) => {
  try {
    const notes = await getUserBlog(req);

    if (notes.length <= 0) {
      res.status(200).json({ error: "no data available" });
    }
    res.status(200).json({
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "internal Server error",
    });
  }
});

router.post("/create/blog", async (req, res) => {
  try {
    //create
    const CreateBlog = await createBlog(req);
    //error
    if (!CreateBlog) {
      res.status(200).json({ error: "error create blog" });
    }

    //response
    return res.status(200).json({
      data: CreateBlog,
      message: "Blog created sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "internal Server error",
    });
  }
});

router.put("/update/blog/:id", async (req, res) => {
  try {
    //update

    const updateBlog = await UpdateBlog(req);

    //error

    if (!updateBlog) {
      res.status(200).json({ error: "blog cannot be update" });
    }

    //res
    return res.status(200).json({
      data: updateBlog,
      message: "Blog update sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "internal Server error",
    });
  }
});

router.delete("/delete/blog/:id", async (req, res) => {
  try {
    //update with params id

    const DeleteBlog = await deleteBlog(req);

    //error update

    if (!DeleteBlog) {
      res.status(200).json({ error: "blog cannot be delete" });
    }
    //response
    return res.status(200).json({
      message: "Blog deleted sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "internal Server error",
    });
  }
});

export const NotesRouter = router;
