const router = require('express').Router();
const { User, Message } = require('../../models');

router.post('/', async (req, res) => {
    
    
    try {
        console.log(req.body);
        
        const newMessage = await Message.create(req.body);

        // const newPost = await Comment.create( {
        //     ...req.body,
        //     userId: req.session.user_id
        // });

        console.log(newMessage);

        res.status(200).json(newMessage);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;