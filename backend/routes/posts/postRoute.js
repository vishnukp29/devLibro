const express = require("express");
const { createPost, 
    fetchPosts, 
    fetchSinglePost, 
    updatePost, 
    deletePost, 
    toggleAddLikeToPost, 
    toggleAddDislikeToPost} = require("../../controllers/posts/postController");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const { pictureUpload, postImageResize } = require("../../middlewares/uploads/photoUpload");


const postRoute = express.Router();

postRoute.post("/", authMiddleware,pictureUpload.single('image'), postImageResize, createPost);
postRoute.put('/likes',authMiddleware,toggleAddLikeToPost)
postRoute.put('/dislikes',authMiddleware,toggleAddDislikeToPost)
postRoute.get('/',fetchPosts) 
postRoute.get('/:id',fetchSinglePost)
postRoute.put('/:id',authMiddleware,updatePost)
postRoute.delete('/:id',authMiddleware,deletePost)

module.exports = postRoute;