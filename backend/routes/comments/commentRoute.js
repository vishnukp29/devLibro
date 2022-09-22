const express = require("express");
const { createComment, 
    fetchAllComments, 
    fetchComment, 
    updateComment, 
    deleteComment} = require("../../controllers/comments/commentController");  
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const commentRoutes = express.Router();

commentRoutes.post("/", authMiddleware, createComment);
commentRoutes.get('/',fetchAllComments)
commentRoutes.get('/:id',authMiddleware,fetchComment)
commentRoutes.put('/:id',authMiddleware,updateComment)
commentRoutes.delete('/:id',authMiddleware,deleteComment)

module.exports = commentRoutes;