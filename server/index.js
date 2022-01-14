const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");

const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const messageRoute = require("./routes/messageRoutes");
const conversationRoute = require("./routes/conversationRoutes");

//Connect to DB
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then((data) => {
    console.log(`MongoDB connected with server ${data.connection.host}`);
  })
  .catch((err) => {
    console.log(err);
  });

//Middleware
app.use(express.json());
app.use(helmet());

//Routes
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/category", categoryRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);

//Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
