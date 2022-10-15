const router = require('express').Router();
const { User, Channel, UserChannel, Message } = require('../../models');

router.post('/', async (req, res) => {
    
    try {
        const newMessage = await Message.create( {
            ...req.body,
            userId: req.session.user_id
        });

        const channelData = await Channel.findByPk(req.body.channelId, {
            include: [
                {model: User, through: UserChannel, as: 'channel_user', attributes: {exclude: ['password']} }
            ]
        });

        const channel = channelData.get({ plain: true });

        let sender;
        const senderId = req.session.user_id;
        let receiver;
        let receiverId;

        for (let i in channel.channel_user) {
            if (channel.channel_user[i].id == req.session.user_id) {
                sender = channel.channel_user[i].username;
            } else {
                receiver = channel.channel_user[i].username;
                receiverId = channel.channel_user[i].id;
            }
        }

        res.status(200).json({newMessage, sender, receiver, senderId, receiverId});
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;