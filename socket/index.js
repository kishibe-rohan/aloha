const io = require("socket.io")(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//maintain a map of userId and socketId
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

//When a user connects..
io.on("connection", (socket) => {
  console.log("A user connected");

  //Get userId and socketId
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //Send and receive message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //Upon disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
