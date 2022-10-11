const router = require('express').Router();
// const { Post, Comment, User } = require ('../models/');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    res.json({message: "hello"})
})

module.exports = router;