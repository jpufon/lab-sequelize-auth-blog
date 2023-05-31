const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', async (req, res) => {
  try {
    const blogs = await db.blogs.findAll();
    res.render('index', { blogs: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// router.get('/blog-post', async (req, res) => {
//     const blogId = req.query.id; // Retrieve the blog post ID from the query parameter
//     try {
//       // Retrieve the specific blog post from the database using the ID
//       const blog = await db.blogs.findByPk(blogId);
//       res.render('blog-post', { blog: blog });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });


module.exports = router;