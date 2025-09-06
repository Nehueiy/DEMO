import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Caller starts a call
  socket.on("start-call", ({ targetId, offer }) => {
    io.to(targetId).emit("incoming-call", { from: socket.id, offer });
  });

  // Receiver accepts
  socket.on("answer-call", ({ targetId, answer }) => {
    io.to(targetId).emit("call-accepted", { from: socket.id, answer });
  });

  // Receiver rejects
  socket.on("reject-call", ({ targetId }) => {
    io.to(targetId).emit("call-rejected", { from: socket.id });
  });

  // ICE candidate exchange
  socket.on("ice-candidate", ({ targetId, candidate }) => {
    io.to(targetId).emit("ice-candidate", { from: socket.id, candidate });
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
