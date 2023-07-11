const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// CREATE new Post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.post_body,
            user_id: req.session.user_id || req.body.user_id
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// READ Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User,
                attributes: { exclude: ['password', 'email'] },
            }, 
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['username'],
                }
            }],
            order: [['updated_at', 'DESC']]
        });

        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// UPDATE Post
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!updatedPost[0]) {
            res.status(400).json({ message: "No Post found with that id!" });
            return;
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// DELETE Post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: "No Post with that id!" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;