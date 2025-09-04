import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();             // <-- define app first
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from /public
app.use(express.static("public"));

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("joinRoom", ({ roomId, name }) => {
    socket.join(roomId);
    console.log(`${name} joined ${roomId}`);
  });

  socket.on("chatMessage", (msg) => {
    io.to(msg.roomId).emit("chatMessage", msg);
  });
});

// Start server
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
