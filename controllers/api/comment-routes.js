const router = require('express').Router();
const { Comment } = require('../../models');

// CREATE new Comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            body: req.body.comment_body,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// READ Comments
router.get('/', async (req, res) => {
    try {
        const posts = await Comment.findAll();

        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// UPDATE comment
router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!updatedComment[0]) {
            res.status(400).json({ message: "No comment found with that id!" });
            return;
        }
        res.status(200).json(updatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// DELETE comment
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: "No comment with that id!" });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;