const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
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

router.get('/create', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }

    res.render('create', {
        logged_in: req.session.logged_in
    });
});

router.get('/userpage', async (req, res) => {

    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    };

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

        console.log(userData.posts.map((p) => p.get({ plain: true })));

        res.render('userpage', {
            logged_in: req.session.logged_in,
            user: userData.get({ plain: true }),
            posts: userData.posts.map((p) => p.get({ plain: true })),
        });
    } catch (err) { 
        console.error(err);
        res.status(500).json(err);
    }

    
})

module.exports = router;
