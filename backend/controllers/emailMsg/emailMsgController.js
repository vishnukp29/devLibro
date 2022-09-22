const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const Filter = require("bad-words");
const EmailMsg = require("../../models/email/emailMessagingModel");
const nodemailer= require('nodemailer')
const { sendMailHelper } = require("../../utils/sendMailHelper");


const sendEmailMsg = expressAsyncHandler(async (req, res) => {
	try {
		const { to, subject, message } = req.body;
		console.log("🚀 ~ file: emailMsgController.js ~ line 12 ~ sendEmailMsg ~ req.body", req.body)
		const msg = {
			to,
			from: process.env.EMAIL,
			subject,
			message,
			sentBy: req?.user?._id,
		};

		const resData = await sendMailHelper(msg);
		//save to our db
		await EmailMsg.create({
			sentBy: req?.user?._id,
			from: req?.user?.email,
			to,
			message,
			subject,
		});
    res.json("Mail sent");

	} catch (error) {
		res.json(error);
	}
});
  
module.exports = { sendEmailMsg };
