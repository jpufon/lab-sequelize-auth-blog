
const express = require('express');
const router = express.Router();
const db = require('../models/index');
const auth = require('../auth'); 

router.get('/admin', auth, async (req, res) => {
    try {
    //   const users = await db.Users.findAll(); // Fetch all users from the Users table
      const blogs = await db.blogs.findAll(); // Fetch all blogs from the Blogs table
  
    
       res.render('admin', {blogs}); // Pass the users and blogs data to the admin view
        // console.log(req.session.passport);
        // res.render('admin')
} catch (error) {
      console.error('Error retrieving data:', error);
      res.redirect('/'); // or display an error message
    }
  });


  router.post('/admin', async (req, res) => {
    // Access the form data submitted by the user
    
   try{

    let { title, body, is_published } = req.body;
    
    is_published = is_published === 'on' ? true : false;
    // Create a new blog using the form data
     await db.blogs.create({
      title,
      body,
      
      // associating blogs with a user here
      userID: req.session.passport.user,
      is_published


      // associating blogs with a user here
    });
    // const blogs = await db.Blogs.findAll();
   console.log(insertRecord);
    // res.redirect('/admin');
    // Render the admin.ejs view with the updated list of blogs
     res.render('admin', { blogs, users  });
  } catch (error) {
    // Handle any errors that occur during blog creation
    // console.error('Error creating blog:', error);
     res.redirect('/admin'); // or display an error message
  }
});

//EDITING BLOGS AS ADMIN

router.put('/admin/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
  
    try {
      // Find the blog with the given id
      const blog = await db.blogs.update({ body: content }, { where: { id: id } });
     
  
      if (!blog) {
        // Blog not found
        res.sendStatus(404);
        return;
      }
  
      // Update the blog's content
     
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Error updating blog:', error);
      res.sendStatus(500);
    }
  });
  
  router.delete('/admin/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.blogs.destroy({ where: { id } });
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});



module.exports = router;
