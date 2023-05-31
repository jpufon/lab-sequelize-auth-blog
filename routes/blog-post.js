const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/blog-post', async (req, res) => {
  const blogId = req.query.id;
  try {
    // Fetch the blog post from the database based on the ID
    const blog = await db.blogs.findOne({ where: { id: blogId } });
    if (blog) {
      // Render the 'blog-post' template with the blog data
      res.render('blog-post', { blog: blog });
    } else {
      // Handle the case when the blog post is not found
      res.status(404).send('Blog post not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;