const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// 👇 important config (stable connection)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let users = {};

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // JOIN
  socket.on("join", (username) => {
    if (!username) return;

    users[socket.id] = username;

    console.log(`${username} joined`);

    io.emit("message", {
      user: "System",
      text: `${username} joined the chat`,
      type: "system"
    });
  });

  // SEND MESSAGE
  socket.on("sendMessage", (msg) => {
    const username = users[socket.id];

    if (!msg || !username) return;

    const data = {
      user: username,
      text: msg,
      id: socket.id,
      time: new Date().toLocaleTimeString()
    };

    console.log("📩 Message:", data);

    io.emit("message", data);
  });

  // TYPING
  socket.on("typing", () => {
    const username = users[socket.id];
    if (username) {
      socket.broadcast.emit("typing", username);
    }
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    const username = users[socket.id];

    if (username) {
      console.log(`❌ ${username} disconnected`);

      io.emit("message", {
        user: "System",
        text: `${username} left the chat`,
        type: "system"
      });

      delete users[socket.id];
    }
  });
});

// 👇 health check (browser test)
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

server.listen(5000, () => {
  console.log("🔥 Server running on http://127.0.0.1:5000");
});