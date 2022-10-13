const router = require('express').Router();
const { User, Message } = require('../../models');

router.post('/', async (req, res) => {
    
    try {
        console.log(req.body);
        
        const newMessage = await Message.create( {
            ...req.body,
            userId: req.session.user_id
        });

        const userData = await User.findByPk(req.session.user_id, {attributes: {exclude: ['password']}});

        const user = userData.get({ plain: true });
        

        // console.log(newMessage);

        console.log(user)

        res.status(200).json({newMessage, user});
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;