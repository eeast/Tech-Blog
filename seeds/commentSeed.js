const sequelize = require('../config/connection');
const { Comment } = require('../models');

const seedComments = async () => {
    const commentData = [
        {"body": "Comment 1", "post_id": 1, "user_id": 4},
        {"body": "Comment 2", "post_id": 3, "user_id": 1},
        {"body": "Comment 3", "post_id": 2, "user_id": 2},
        {"body": "Comment 4", "post_id": 4, "user_id": 5},
        {"body": "Comment 5", "post_id": 2, "user_id": 2},
        {"body": "Comment 6", "post_id": 1, "user_id": 2},
        {"body": "Comment 7", "post_id": 4, "user_id": 3},
        {"body": "Comment 8", "post_id": 5, "user_id": 4},
        {"body": "Comment 9", "post_id": 5, "user_id": 1},
        {"body": "Comment 10", "post_id": 3, "user_id": 5}
    ]

    await Comment.bulkCreate(commentData);
};

module.exports = seedComments;