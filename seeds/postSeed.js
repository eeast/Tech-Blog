const sequelize = require('../config/connection');
const { Post } = require('../models');

const seedPosts = async () => {
    const postData = [
        {"title":"Post 1","body":"This is Post 1","user_id":1},
        {"title":"Post 2","body":"This is Post 2","user_id":2},
        {"title":"Post 3","body":"This is Post 3","user_id":3},
        {"title":"Post 4","body":"This is Post 4","user_id":4},
        {"title":"Post 5","body":"This is Post 5","user_id":5}
    ];

    await Post.bulkCreate(postData);
};

module.exports = seedPosts;