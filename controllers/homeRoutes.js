const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
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

        const posts = postData.map((u) => u.get({ plain: true }));

        console.log(posts);

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/register', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('register');
});

router.get('/create', withAuth, (req, res) => {
    res.render('create', {
        logged_in: req.session.logged_in
    });
});

router.get('/userpage', withAuth, async (req, res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            include: {
                model: Post,
                include: {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                order: [['updated_at', 'DESC']]
            },
            attributes: { exclude: ['password', 'email'] }
        });

        res.render('userpage', {
            logged_in: req.session.logged_in,
            user: userData.get({ plain: true }),
            posts: userData.posts.map((p) => p.get({ plain: true })),
        });
    } catch (err) { 
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                }
            ]
        });

        res.render('postpage', {
            logged_in: req.session.logged_in,
            post: postData.get({ plain: true })
        })
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                }
            ]
        });

        console.log(postData.get({ plain: true }));

        res.render('edit', {
            logged_in: req.session.logged_in,
            post: postData.get({ plain: true })
        })
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
