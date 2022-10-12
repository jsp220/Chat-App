const router = require('express').Router();
const { Channel, Message, User, UserChannel } = require ('../models/');
const withAuth = require('../utils/auth');

// router.get('/', async (req,res) => {
//     res.json({message: "hello"})
// });

router.get('/', withAuth, async (req,res) => {
    try {
        const userChannelData = await UserChannel.findAll({
            where: {
                userId: req.session.user_id
            }
        })

        const userChannels = userChannelData.map((data) => data.get({ plain: true }));

        const userData = await User.findAll();

        const users = userData.map((data) => data.get({ plain: true }));
        
        // console.log(userChannels)

        let channel = [];

        for (let i=0; i < userChannels.length; i++) {
            const channelData = await Channel.findByPk(userChannels[i].channelId);
            channel.push(channelData.get({ plain: true }));
            // console.log(channel)
        }

        res.render('home', {channel, users, logged_in: req.session.logged_in})
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/channel/:id', withAuth, async (req, res) => {
    try {
        const userChannelData = await UserChannel.findAll({
            where: {
                userId: req.session.user_id
            }
        })
        const userChannels = userChannelData.map((data) => data.get({ plain: true }));
        // console.log(userChannels)
        let channel = [];
        for (let i=0; i < userChannels.length; i++) {
            const channelData = await Channel.findByPk(userChannels[i].channelId);
            channel.push(channelData.get({ plain: true }));
            // console.log(channel)
        }
        const singleChannelData = await Channel.findByPk(req.params.id, {
            include: [
                {model: User, through: UserChannel, as: 'channel_user', attributes: {exclude: ['password']} },
                // {model: User, through: UserChannel, as: 'channel_user'}, 

                {model: Message, include: [
                    {model: User, attributes: {exclude: ['password']} }
                ]}
            ]
        });
        const singleChannel = singleChannelData.get({ plain: true });
        const messageData = await Message.findAll({
            where:{
                channelId:req.params.id,
            }
        });
        const message = messageData.map((message) => message.get({ plain:true }));
        res.render('single-channel', { message, channel, singleChannel, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/channel/:id', withAuth, async (req, res) => {
    try {
        const userChannelData = await UserChannel.findAll({
            where: {
                userId: req.session.user_id
            }
        })
        const userChannels = userChannelData.map((data) => data.get({ plain: true }));
        // console.log(userChannels)
        let channel = [];
        for (let i=0; i < userChannels.length; i++) {
            const channelData = await Channel.findByPk(userChannels[i].channelId);
            channel.push(channelData.get({ plain: true }));
            // console.log(channel)
        }
        const singleChannelData = await Channel.findByPk(req.params.id, {
            include: [
                {model: User, through: UserChannel, as: 'channel_user', attributes: {exclude: ['password']} },
                // {model: User, through: UserChannel, as: 'channel_user'},
                {model: Message, include: [
                    {model: User, attributes: {exclude: ['password']} }
                ]}
            ]
        });
        const singleChannel = singleChannelData.get({ plain: true });

        res.render('single-channel', {  channel, singleChannel, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login', {logged_in: req.session.logged_in});
  });

router.get('/signup', (req, res) => {
// If the user is already logged in, redirect the request to another route
if (req.session.logged_in) {
    res.redirect('/');
    return;
}

res.render('signup', {logged_in: req.session.logged_in});
});



module.exports = router;