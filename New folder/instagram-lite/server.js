io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("joinRoom", ({ roomId, name }) => {
    console.log(`${name} joined ${roomId}`);
    socket.join(roomId);
  });

  socket.on("offer", ({ roomId, offer }) => {
    console.log("Offer received for room", roomId);
    socket.to(roomId).emit("offer", { offer });
  });

  socket.on("answer", ({ roomId, answer }) => {
    console.log("Answer received for room", roomId);
    socket.to(roomId).emit("answer", { answer });
  });

  socket.on("ice-candidate", ({ roomId, candidate }) => {
    console.log("ICE candidate received for room", roomId);
    socket.to(roomId).emit("ice-candidate", { candidate });
  });
});
