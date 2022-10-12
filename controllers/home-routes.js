const router = require('express').Router();
const { Channel, Message, User, UserChannel } = require ('../models/');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    res.json({message: "hello"})
});

router.get('/channel/:id', async (req, res) => {
    try {
        const channelData = await Channel.findByPk(req.params.id, {
            include: [
                {model: User, through: UserChannel, as: 'channel_user', attributes: {exclude: ['password']} },
                // {model: User, through: UserChannel, as: 'channel_user'}, 

                {model: Message, include: [
                    {model: User, attributes: {exclude: ['password']} }
                ]}
            ]
        });

        const channel = channelData.get({ plain: true });

        // console.log(channel);

        // res.render('single-post', { post, logged_in: req.session.logged_in });
        res.json(channel);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;