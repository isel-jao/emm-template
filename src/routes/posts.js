const express = require("express");
const Post = require("../models/post");
const logger = require("../utils/logger");
const router = express.Router();

const findMany = async (req, res) => {
  try {
    const query = req.query;
    const limit = query.limit || 10;
    const skip = query.skip || 0;
    const page = query.page || 1;

    const data = await Post.find({ limit })
      .limit(limit)
      .skip(limit * (page - 1));
    const count = await Post.countDocuments();
    res.json({
      data,
      count,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send("Error getting posts");
  }
};

router.get("/", findMany);

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.json(post);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const post = new Post({ ...req.body, updatedAt: Date.now() });
    const data = await post.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err);
    logger.error(err);
  }
});
router.post("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPost = { ...req.body, updatedAt: Date.now() };

    const data = await Post.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });
    if (!data) {
      res.status(404).send("Post not found");
    }
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
    logger.error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Post.findByIdAndDelete(id);
    if (!data) {
      res.status(404).send("Post not found");
    }
    res.status(204).send(data);
  } catch (err) {
    res.status(500).send(err);
    logger.error(err);
  }
});

module.exports = router;
