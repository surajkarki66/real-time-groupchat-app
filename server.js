const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const createAdapter = require("@socket.io/redis-adapter").createAdapter;
const redis = require("redis");
const { createClient } = redis;

const {
  NODE_ENV,
  PORT,
  REDIS_DEV_CLIENT_URL,
  REDIS_PROD_CLIENT_URL,
} = require("./config");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");
const formatMessage = require("./utils/messages");

const botName = "Chitchat Bot";
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

(async () => {
  pubClient = createClient({
    url:
      NODE_ENV === "production" ? REDIS_PROD_CLIENT_URL : REDIS_DEV_CLIENT_URL,
  });
  await pubClient.connect();
  subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));
})();

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ name, room }) => {
    const user = userJoin(socket.id, name, room);
    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to Chitchat! Your room id is " + user.room));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.name} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.name, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.name} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
