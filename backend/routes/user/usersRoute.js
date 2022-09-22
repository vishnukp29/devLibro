const express = require('express');
const {userRegister, 
    loginUser, 
    fetchUsers, 
    deleteUser, 
    userDetails,
    userProfile, 
    updateProfile, 
    updatePassword, 
    followingUser, 
    unfollowUser, 
    blockUser, 
    unBlockUser, 
    generateVerificationToken, 
    accountVerification, 
    forgetPasswordToken, 
    passwordReset, 
    profilePhotoUpload}=require('../../controllers/users/userController');

const authMiddleware = require('../../middlewares/auth/authMiddleware');
const {
    pictureUpload,
    profilePhotoResize
  } = require("../../middlewares/uploads/photoUpload");


const userRoutes=express.Router()
userRoutes.post('/register',userRegister)
userRoutes.post('/login',loginUser)

userRoutes.post("/verify-mail-token",authMiddleware,generateVerificationToken);
userRoutes.put("/verifyaccount",authMiddleware,accountVerification);


userRoutes.put('/updatepassword/',authMiddleware,updatePassword)
userRoutes.post('/forgetpasswordtoken',forgetPasswordToken)
userRoutes.put('/resetpassword',passwordReset)

userRoutes.put(
    '/profilephoto',
    authMiddleware,
    pictureUpload.single('image'),
    profilePhotoResize,
    profilePhotoUpload)


userRoutes.put("/follow", authMiddleware, followingUser);
userRoutes.put("/unfollow", authMiddleware, unfollowUser);

userRoutes.get('/',authMiddleware,fetchUsers)
userRoutes.put("/blockuser/:id", authMiddleware, blockUser);
userRoutes.put("/unblockuser/:id", authMiddleware, unBlockUser);
userRoutes.get('/profile/:id',authMiddleware,userProfile)
userRoutes.put('/',authMiddleware,updateProfile)
userRoutes.delete('/:id',deleteUser)
userRoutes.get('/:id',userDetails)

module.exports=userRoutes