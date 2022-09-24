const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../models/comment/commentModel");
const blockUser = require("../../utils/blockUser");
const validateMongodbId = require("../../utils/validateMongodbID");


// Create Comment
const createComment = expressAsyncHandler(async (req, res) => {
  //1.Get the user
  const user = req.user;

  // Ckeck user is blocked
  blockUser(user)

  //2.Get the post Id
  const { postId, description } = req.body;
  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

// Fetch all Comments
const fetchAllComments = expressAsyncHandler(async (req, res) => {
    try {
      const comments = await Comment.find({}).sort("-created");
      res.json(comments);
    } catch (error) {
      res.json(error);
    }
});

//Fetch Single Comments
const fetchComment = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await Comment.findById(id);
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  });
 
//Comment Update
const updateComment = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const update = await Comment.findByIdAndUpdate(
        id,
        {
          user: req?.user,
          description: req?.body?.description,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(update);
    } catch (error) {
      res.json(error);
    }
});  

//delete
const deleteComment = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const comment = await Comment.findByIdAndDelete(id);
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  });

module.exports = { 
    createComment, 
    fetchAllComments, 
    fetchComment,
    updateComment,
    deleteComment
 };
