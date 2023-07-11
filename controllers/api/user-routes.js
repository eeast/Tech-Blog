const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


// CREATE new user
router.post('/register', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
  
        // Set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = dbUserData.id;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// READ Users
router.get('/', async (req, res) => {
    try {
        const posts = await User.findAll({
            include: {
                model: Post,
                include: {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                }
            },
            attributes: { exclude: ['password', 'email'] }
        });

        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


// Login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
  
        if (!dbUserData) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }
  
        const validPassword = await dbUserData.checkPassword(req.body.password);
  
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        console.log(`\x1b[33mSuccessful Login: ${dbUserData.username}\x1b[0m`);
  
        // Once the user successfully logs in, set up the sessions variable 'loggedIn'
        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = dbUserData.id;
            res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


// Logout
router.post('/logout', (req, res) => {
    // When the user logs out, destroy the session
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;