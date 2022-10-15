const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        req.body.username = req.body.username.toLowerCase();
        
        const userData = await User.create(req.body);

        const newUser = userData.get({ plain: true });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_in = true;

            console.log(newUser);
            res.status(200).json(newUser);
        })
        // }
    } catch (err) {
        res.status(400).json({ message: 'User name already exists and/or password is too short' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });



        if (!userData) {
            res
                .status(400)
                .json({ 'message': 'Incorrect user name or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect user name or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.status(200).json({ message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    console.log(req.session.logged_in);
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(500).end();
    }
});

module.exports = router;