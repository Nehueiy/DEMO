io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("joinRoom", ({ roomId, name }) => {
    socket.join(roomId);
    console.log(`${name} joined ${roomId}`);
  });

  // Chat
  socket.on("chatMessage", (msg) => {
    io.to(msg.roomId).emit("chatMessage", msg);
  });

  // WebRTC signaling
  socket.on("offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("offer", { offer });
  });

  socket.on("answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("answer", { answer });
  });

  socket.on("ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("ice-candidate", { candidate });
  });
});
