const router = require('express').Router();
const { Channel, Message, User, UserChannel } = require ('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res) => {
    try {
        const userId = req.session.user_id;
        const username = req.session.username;
        
        const userChannelData = await UserChannel.findAll({ where: {userId} })
        const userChannels = userChannelData.map((data) => data.get({ plain: true }));

        const userData = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        const allUsers = userData.map((data) => data.get({ plain: true }));
        const users = allUsers.filter((user) => user.id != userId);

        let channels = [];

        for (let i in userChannels) {
            const channelData = await Channel.findByPk(userChannels[i].channelId, {
                include: [
                    {model: User, through: UserChannel, as: 'channel_user', attributes: {exclude: ['password']} }
                ]
            });

            channels.push(channelData.get({ plain: true }));
            // console.log(channel)
        }

        console.log(channels);

        let channel = [];

        for (let i in channels) {
            const id = channels[i].id;
            const name = channels[i].name;
            const user1 = req.session.username;
            let user2;
            if (channels[i].channel_user[0].username != user1) {
                user2 = channels[i].channel_user[0].username;
            } else {
                user2 = channels[i].channel_user[1].username;
            }
            
            // let user2;
            // for (let j in channels[i].channel_user) {
            //     if (channels[i].channel_user[j].username != req.session.username) {
            //         user2 = channel[i].channel_user[j].username;
            //     }
            // }
            channel.push({id, name, user1, user2});
        }
        console.log(channel);

        res.render('home', {channel, users, userId, username, logged_in: req.session.logged_in})
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/channel/:id', withAuth, async (req, res) => {
    try {      
        // find all rows in UserChannel where the current user appears (to find all channels they belong to)
        const userChannelData = await UserChannel.findAll({
            where: {
                userId: req.session.user_id
            }
        })
        // console.log(req.session.user_id)
        const userId = req.session.user_id;
        const userChannels = userChannelData.map((data) => data.get({ plain: true }));

        let channels = [];
        let channelBelong = false;
        // create an array called channel 
        for (let i in userChannels) {
            const channelData = await Channel.findByPk(userChannels[i].channelId, {
                include: [
                    {model: User, through: UserChannel, as: 'channel_user', attributes: {exclude: ['password']} }
                ]
            });
            channels.push(channelData.get({ plain: true }));

            if (userChannels[i].channelId == req.params.id) {

                channelBelong = true;
                console.log(channelBelong);
            } 
        }

        if (channelBelong) {

            let channel = [];

            for (let i in channels) {
                const id = channels[i].id;
                const name = channels[i].name;
                const user1 = req.session.username;
                let user2;
                if (channels[i].channel_user[0].username != user1) {
                    user2 = channels[i].channel_user[0].username;
                } else {
                    user2 = channels[i].channel_user[1].username;
                }
                
                // let user2;
                // for (let j in channels[i].channel_user) {
                //     if (channels[i].channel_user[j].username != req.session.username) {
                //         user2 = channel[i].channel_user[j].username;
                //     }
                // }
                channel.push({id, name, user1, user2});
            }

            console.log(channel);

            const singleChannelData = await Channel.findByPk(req.params.id, {
                include: [
                    {model: User, through: UserChannel, as: 'channel_user', attributes: {exclude: ['password']} },
                    {model: Message, include: [
                        {model: User, attributes: {exclude: ['password']} }
                    ]}
                ]
            });
            
            const singleChannel = singleChannelData.get({ plain: true });
            // console.log(singleChannel);
            const messageData = await Message.findAll({
                where:{
                    channelId:req.params.id,
                }
            });
            
            const message = messageData.map((message) => message.get({ plain:true }));
            console.log(singleChannel);
            res.render('single-channel', {  message, channel, singleChannel, logged_in: req.session.logged_in, userId });
        } else {
            res.status(400).redirect('/')
        }
    } catch (err) {
        return;
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

router.get('*', (req, res) => res.redirect('/'));

module.exports = router;