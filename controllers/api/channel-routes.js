const router = require('express').Router();
const { User, Channel, UserChannel } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const channelName = `${req.session.username} & ${req.body.username}`;
       
        const currentUserData = await User.findOne({
            where: {
                username: req.session.username
            },
            include: [
                {model: Channel, through: UserChannel, as: 'user_channel', include: [
                    {model: User, through: UserChannel, as: 'channel_user', attributes: {exclude: ['password']} }
                ]}
            ]
        });

        const currentUser = currentUserData.get({ plain: true });

        const user2Data = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        const user2 = user2Data.get({ plain: true });
        var channelExists = [false, 0];

        for (let i in currentUser.user_channel) {
            const channel = currentUser.user_channel[i];
            
            console.log(channel);
            
            for (let i in channel.channel_user) {
                const userInChannel = channel.channel_user[i];
                // console.log(userInChannel);
                // console.log(user2.id);
                if (userInChannel.id == user2.id) {
                    console.log('Channel exists, redirecting')
                    channelExists[0] = true;
                    channelExists[1] = channel.id;
                    break;
                }
            }
            if (channelExists[0]) {
                break;
            }
        }

        console.log(channelExists);
        
        if (!channelExists[0]) {
            const newChannel = await Channel.create({name: channelName});
            const channel = newChannel.get({ plain: true });
            channelExists[1] = channel.id;
    
            const newUserChannel1 = await UserChannel.create({
                userId: req.session.user_id,
                channelId: channel.id
            })
    
            const newUserChannel2 = await UserChannel.create({
                userId: user2.id,
                channelId: channel.id
            })
        }
        res.status(200).json({id: channelExists[1]});
    } catch (err) {
        res.status(400).json(err);
    }
});

// router.put('/:id', async (req, res) => {
//     try {
//         const updatePost = await Post.update( 
//             {
//                 ...req.body,
//                 userId: req.session.user_id,
//             },
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             });

//         res.status(200).json(updatePost);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedPost = await Post.destroy( 
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             });
//         res.status(200).json(deletedPost);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

module.exports = router;