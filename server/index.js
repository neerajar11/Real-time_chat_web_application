const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes");
const socket = require("socket.io")

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/",messageRoutes);


mongoose.connect("mongodb://0.0.0.0:27017/chatDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database connected");
}).catch((err) => {
  console.log(err.message);
});

const server = app.listen(3000 || process.env.PORT, () => {
  console.log("Server started on port 3000");
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    // console.log(userId)
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    // console.log(data);
    const sendUserSocket = onlineUsers.get(data.to);
    // console.log(sendUserSocket);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});