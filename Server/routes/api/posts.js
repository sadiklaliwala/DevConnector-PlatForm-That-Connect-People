const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json(posts);
  } catch (err) {
    return res.status(404).json({ nopostsfound: 'No posts found' });
  }
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ nopostfound: 'No post found with that ID' });
    }

    res.json(post);
  } catch (err) {
    res.status(404).json({ nopostfound: 'No post found with that ID' });
  }
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ postnotfound: 'No post found' });
      }

      // Check for post owner
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' });
      }

      await Post.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ postnotfound: 'No post found' });
      }

      // Check if user already liked the post
      const alreadyLiked = post.likes.some(
        like => like.user.toString() === req.user.id
      );

      if (alreadyLiked) {
        return res.status(400).json({ alreadyliked: 'User already liked this post' });
      }

      // Add user id to likes array
      post.likes.unshift({ user: req.user.id });

      const updatedPost = await post.save();
      res.json(updatedPost);
    } catch (err) {
      res.status(404).json({ postnotfound: 'No post found' });
    }
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ postnotfound: 'No post found' });
      }

      // Check if user has liked the post
      const likeIndex = post.likes.findIndex(
        like => like.user.toString() === req.user.id
      );

      if (likeIndex === -1) {
        return res.status(400).json({ notliked: 'You have not yet liked this post' });
      }

      // Remove the like
      post.likes.splice(likeIndex, 1);

      const updatedPost = await post.save();
      res.json(updatedPost);
    } catch (err) {
      res.status(404).json({ postnotfound: 'No post found' });
    }
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ postnotfound: 'No post found' });
      }

      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      // Add to comments array
      post.comments.unshift(newComment);

      const updatedPost = await post.save();
      res.json(updatedPost);
    } catch (err) {
      res.status(404).json({ postnotfound: 'No post found' });
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ postnotfound: 'No post found' });
      }

      // Find comment index
      const commentIndex = post.comments.findIndex(
        comment => comment._id.toString() === req.params.comment_id
      );

      // Check if comment exists
      if (commentIndex === -1) {
        return res.status(404).json({ commentnotexists: 'Comment does not exist' });
      }

      // Remove comment
      post.comments.splice(commentIndex, 1);

      const updatedPost = await post.save();
      res.json(updatedPost);
    } catch (err) {
      res.status(404).json({ postnotfound: 'No post found' });
    }
  }
);

module.exports = router;