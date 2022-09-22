const express=require('express')
const dotenv=require('dotenv').config()
const cors = require("cors");
const dbConnect=require('./config/db/dbConnect')
const { errorHandler, notFound } = require('./middlewares/error/errorHandler')
const userRoutes = require('./routes/user/usersRoute');
const postRoute = require('./routes/posts/postRoute');
const commentRoutes = require("./routes/comments/commentRoute");
const emailMsgRoute = require("./routes/emailMsg/emailMsgRoute");
const categoryRoute = require('./routes/category/categoryRoutes');

 
const app=express()

// Middleware
app.use(express.json())

//cors
app.use(cors());

// User's Route
app.use('/api/users',userRoutes)

// Post Routes
app.use('/api/posts',postRoute)

// Comment Routes
app.use("/api/comments", commentRoutes);

//email msg
app.use("/api/email", emailMsgRoute);

// Category Routes
app.use('/api/category', categoryRoute);
// Error Handler
app.use(notFound)
app.use(errorHandler)


const PORT=process.env.PORT || 5000
app.listen(PORT, console.log(`Server is Running ${PORT}`))

