'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const blogsData = [
      {
        title: "Sample Blog 1",
        body: "This is the content of sample blog 1",
        userID: 1, // Assuming you have a valid user ID here
        createdAt: new Date(),
        updatedAt: new Date(),
        is_published: false
      },
      {
        title: "Sample Blog 2",
        body: "This is the content of sample blog 2",
        userID: 1, // Assuming you have a valid user ID here
        createdAt: new Date(),
        updatedAt: new Date(),
        is_published: false
      },
      {
        title: "Sample Blog 3",
        body: "This is the content of sample blog 3",
        userID: 2, // Assuming you have a valid user ID here
        createdAt: new Date(),
        updatedAt: new Date(),
        is_published: true
      }
    ];

    // Check if the specified user IDs exist in the Users table
    const existingUsers = await queryInterface.sequelize.query(
      'SELECT id FROM Users WHERE id IN (:userIds)',
      {
        replacements: {
          userIds: blogsData.map(blog => blog.userID),
        },
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    // Extract the existing user IDs
    const existingUserIds = existingUsers.map(user => user.id);

    // Filter out blogs with non-existent user IDs
    const validBlogsData = blogsData.filter(blog => existingUserIds.includes(blog.userID));

    await queryInterface.bulkInsert('Blogs', validBlogsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Blogs', null, {});
  }
};
