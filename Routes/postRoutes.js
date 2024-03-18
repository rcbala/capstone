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
    
    const CreateBlog = await createBlog(req);
    
    if (!CreateBlog) {
      res.status(200).json({ error: "error create blog" });
    }

  
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
    

    const updateBlog = await UpdateBlog(req);

  

    if (!updateBlog) {
      res.status(200).json({ error: "blog cannot be update" });
    }

    
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
    

    const DeleteBlog = await deleteBlog(req);

    

    if (!DeleteBlog) {
      res.status(200).json({ error: "blog cannot be delete" });
    }
  
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
