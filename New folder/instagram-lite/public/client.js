let pc = null;
let localStream = null;
joinBtn.addEventListener("click", () => {
  me = nameEl.value.trim();
  roomId = roomEl.value.trim();

  if (!me || !roomId) return alert("Enter name and Room ID");

  // Notify server you joined
  socket.emit("joinRoom", { name: me, roomId });

  // Enable Start Call button
  startCallBtn.disabled = false;

  addSystem(`You joined room ${roomId}`);
});

startCallBtn.addEventListener("click", async () => {
  if (!roomId) return alert("Join a room first!");

  startCallBtn.disabled = true;
  hangupBtn.disabled = false;

  // Reset pc if already exists
  if (pc) pc.close();
  pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  localAudio.srcObject = localStream;

  // Add tracks to peer connection
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

  // When remote track arrives
  pc.ontrack = (event) => { remoteAudio.srcObject = event.streams[0]; };

  // ICE candidates
  pc.onicecandidate = (event) => {
    if (event.candidate) socket.emit("ice-candidate", { roomId, candidate: event.candidate });
  };

  // Create offer and send to server
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  socket.emit("offer", { roomId, offer });
});

hangupBtn.addEventListener("click", () => {
  if (pc) pc.close();
  pc = null;
  localAudio.srcObject = null;
  remoteAudio.srcObject = null;
  startCallBtn.disabled = false;
  hangupBtn.disabled = true;
});

// Handle incoming offer/answer/candidates
socket.on("offer", async ({ offer }) => {
  if (!pc) {
    pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localAudio.srcObject = localStream;
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

    pc.ontrack = (event) => { remoteAudio.srcObject = event.streams[0]; };
    pc.onicecandidate = (event) => {
      if (event.candidate) socket.emit("ice-candidate", { roomId, candidate: event.candidate });
    };
  }
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  socket.emit("answer", { roomId, answer });
});

socket.on("answer", async ({ answer }) => {
  if (pc) await pc.setRemoteDescription(answer);
});

socket.on("ice-candidate", async ({ candidate }) => {
  if (pc) await pc.addIceCandidate(candidate);
});
