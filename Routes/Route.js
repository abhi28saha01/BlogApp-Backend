const express = require('express');
const router = express.Router();

const {createPost,UpdatePost,GetPost,GetPostbyID,DeletePost} = require('../Controller/PostController');

router.post('/create/post',createPost);
router.delete('/delete/post/:id',DeletePost);
router.get('/read/post',GetPost);
router.get('/read/post/:id',GetPostbyID);
router.put('/update/post/:id',UpdatePost);

module.exports = router;