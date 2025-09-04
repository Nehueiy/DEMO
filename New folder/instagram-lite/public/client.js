let pc = null;
let localStream = null;
joinBtn.addEventListener("click", () => {
  me = nameEl.value.trim();
  roomId = roomEl.value.trim();
  console.log("Joining room:", roomId, "as", me); 
  if (!me || !roomId) return alert("Enter name and Room ID");

  // Notify server you joined
  socket.emit("joinRoom", { name: me, roomId });

  // Enable Start Call button
  startCallBtn.disabled = false;

  addSystem(`You joined room ${roomId}`);
});
startCallBtn.addEventListener("click", async () => {
  console.log("Start Call clicked");
  if (!roomId) return alert("Join a room first!");
  console.log("Room ID:", roomId);

  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  console.log("Got local stream");

  localAudio.srcObject = localStream;

  pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

  pc.ontrack = (event) => { 
    console.log("Received remote track");
    remoteAudio.srcObject = event.streams[0]; 
  };

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("Sending ICE candidate");
      socket.emit("ice-candidate", { roomId, candidate: event.candidate });
    }
  };

  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

  const offer = await pc.createOffer();
  console.log("Created offer");
  await pc.setLocalDescription(offer);
  socket.emit("offer", { roomId, offer });
  console.log("Offer sent");
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
