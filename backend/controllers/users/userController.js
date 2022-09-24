const expressAsyncHandler = require("express-async-handler");
const crypto = require("crypto");
const fs= require("fs");
const nodemailer = require("nodemailer")
const generateToken = require("../../config/token/generateToken");
const sgMail = require("@sendgrid/mail");
const User = require("../../models/user/userModel");
const validateMongodbId = require("../../utils/validateMongodbId");
const cloudinaryUploadImg = require("../../utils/cloudinary");
// sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
const {sendMailHelper} =require('../../utils/sendMailHelper')
// const blockUser = require('../../utils/blockUser')


// User Registration
const userRegister = expressAsyncHandler(async (req, res) => {
  // Check if user is already registered
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) throw new Error("User Already registered");
  console.log(req.body);
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// User Login
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check if user exists
  const userFound = await User.findOne({ email });

  // Check the user is blocked
  if(userFound?.isBlocked){
    throw new Error('You have been Blocked')
  }

  //Check if password is match
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePicture: userFound?.profilePicture,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
      isVerified: userFound?.isAccountVerified,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

// Fetch Users
const fetchUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).populate('posts')
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

// Delete Users
const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

// User Details
const userDetails = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// USer Profile
const userProfile = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const loginUserId = req?.user?._id?.toString()

  try {
    const myProfile = await User.findById(id).populate('posts').populate('viewedBy')
    const alreadyViewed = myProfile?.viewedBy?.find(user =>{
      return user?._id?.toString() === loginUserId
    })
    if(alreadyViewed){
      res.json(myProfile);
    }else{
      const profile = await User.findByIdAndUpdate(myProfile?._id, {
        $push: { viewedBy: loginUserId },
      });
      res.json(profile);
    }
    
  } catch (error) {
    res.json(error);
  }
});

// Update profile
const updateProfile = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;

  // Ckeck user is blocked
  blockUser(req?.user)

  validateMongodbId(_id);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

// Update Password
const updatePassword = expressAsyncHandler(async (req, res) => {
  // Destructure the login user
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  }
  res.json(user);
});

//following
const followingUser = expressAsyncHandler(async (req, res) => {
  //1.Find the user you want to follow and update it's followers field
  //2. Update the login user following field
  const { followId } = req.body;
  const loginUserId = req.user.id;

  //find the target user and check if the login id exist
  const targetUser = await User.findById(followId);

  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );

  if (alreadyFollowing) throw new Error("You have already followed this user");

  //1. Find the user you want to follow and update it's followers field
  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    { new: true }
  );

  //2. Update the login user following field
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  );
  res.json("You have successfully followed this user");
});

//unfollow
const unfollowUser = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    { new: true }
  );

  res.json("You have Successfully Unfollowed this User");
});

//Block user
const blockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params; 
  validateMongodbId(id);
 
  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );
  res.json(user);
});

//UnBlock user
const unBlockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );
  res.json(user);
});

// Generate Email Verification Token
const generateVerificationToken = expressAsyncHandler(async (req, res) => {
	const { to, from, subject, message, resetURL } = req.body;

	// Step 1
	// transporter is what going to connect you to whichever host domain that using or either services that you'd like to
	// connect
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});

	const loginUserId = req.user.id;
	const user = await User.findById(loginUserId);
	try {
		// Generate token
		const verificationToken = await user?.createAccountVerificationToken();
		// save user
		await user.save();
		//build your message
		const resetURL = `If you were requested to verify your account, verify now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/verifyaccount/${verificationToken}">Click to verify your account</a>`;
		let mailOptions = {
			from: "info.devlibro@gmail.com",
			to: user?.email,
			subject: "devLibro Verification",
			message: "verify your account now",
			html: resetURL,
		};
		// step 3
		transporter.sendMail(mailOptions, function (err, data) {
			if (err) {
				console.log("Error Occurs", err);
			} else {
				console.log("Email sent");
			}
		});
		res.json(resetURL);
	} catch (error) {
		res.json(error);
	}
});

//Account verification
const accountVerification = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  //find this user by token

  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationExpires: { $gt: new Date() },
  });
  if (!userFound) throw new Error("Token expired, try again later");
  //update the proprt to true
  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationExpires = undefined;
  await userFound.save();
  res.json(userFound);
});

//------------------------------
//Forget token generator
//------------------------------

const forgetPasswordToken = expressAsyncHandler(async (req, res) => {
	// find the user by email
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) throw new Error("User not found");
	try {
		const token = await user.createPasswordResetToken();
		await user.save();
		//build your message
		const resetURL = `If you were requested to reset your password, reset now within 10
		minutes, otherwise ignore this message <a href="http://localhost:3000/resetpassword/${token}"> Click Here to reset </a>`;
		const msg = {
			to: email,
			from: "info.devlibro@gmail.com",
			subject: "Reset Password",
			html: resetURL,
      message:'Reset your Password'
		};
    await sendMailHelper(msg)
		res.json({
			msg: `A verification message is successfully sent to ${user?.email}. Reset now within 10 minutes, ${resetURL}`,
		});
	} catch (error) {
		res.json(error);
	}
});

//------------------------------
//Password reset
//------------------------------

const passwordReset = expressAsyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  //find this user by token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, try again later");

  //Update/change the password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});


//Profile photo upload
const profilePhotoUpload = expressAsyncHandler(async (req, res) => {
  //Find the login user
  const { _id } = req.user;

  // Ckeck user is blocked
  blockUser(req.user)

  //1. Get the Path to image
  const localPath = `public/images/profile/${req.file.filename}`;

  //2.Upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);
  
  const foundUser = await User.findByIdAndUpdate(
    _id,
    {
      profilePicture: imgUploaded?.url,
    },
    { new: true }
  );
  
   //remove the saved img
   fs.unlinkSync(localPath);
   res.json(imgUploaded);
});

module.exports = {
  userRegister,
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
  profilePhotoUpload 
};
