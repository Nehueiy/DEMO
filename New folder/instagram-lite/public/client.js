let pc = null;
let localStream = null;

startCallBtn.addEventListener("click", async () => {
  startCallBtn.disabled = true;
  hangupBtn.disabled = false;

  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  localAudio.srcObject = localStream;

  pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

  pc.ontrack = (event) => { remoteAudio.srcObject = event.streams[0]; };
  pc.onicecandidate = (event) => {
    if (event.candidate) socket.emit("ice-candidate", { roomId, candidate: event.candidate });
  };

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  socket.emit("offer", { roomId, offer });
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
