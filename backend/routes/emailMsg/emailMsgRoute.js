const express = require("express");
const { sendEmailMsg } = require("../../controllers/emailMsg/emailMsgController");

const authMiddleware = require("../../middlewares/auth/authMiddleware");
const emailMsgRoute = express.Router();

emailMsgRoute.post("/", authMiddleware, sendEmailMsg);

module.exports = emailMsgRoute;
