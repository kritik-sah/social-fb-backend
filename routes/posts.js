const router = require("express").Router();
const Post = require("../modles/Post");

// create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("your post has been updated");
    } else {
      res.status(403).json("You can't update someones else posts");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("your post has been deleted sucessfuly");
    } else {
      res.status(403).json("You can't delete someones else posts");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("This post has been liked, thank you");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res
        .status(200)
        .json("your like has been removed from this post, thank you");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//get timeline posts

module.exports = router;
