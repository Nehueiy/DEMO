// client.js (module)
const socket = io(); // socket.io client

// UI refs
const authPanel = document.getElementById('authPanel');
const appPanel = document.getElementById('appPanel');

const tabSignup = document.getElementById('tabSignup');
const tabLogin = document.getElementById('tabLogin');

const su_username = document.getElementById('su_username');
const su_password = document.getElementById('su_password');
const btnSignup = document.getElementById('btnSignup');
const su_msg = document.getElementById('su_msg');

const li_username = document.getElementById('li_username');
const li_password = document.getElementById('li_password');
const btnLogin = document.getElementById('btnLogin');
const li_msg = document.getElementById('li_msg');

const meName = document.getElementById('meName');
const usersList = document.getElementById('usersList');
const chatHeader = document.getElementById('chatHeader');
const messagesEl = document.getElementById('messages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const btnLogout = document.getElementById('btnLogout');

const localAudio = document.getElementById('localAudio');
const remoteAudio = document.getElementById('remoteAudio');
const hangupBtn = document.getElementById('hangupBtn');

// state
let me = null; // {id, username}
let token = null;
let users = []; // list from server
let currentTarget = null; // selected user id for DM / call
let callerId = null;

socket.on("incoming-call", async ({ from, offer }) => {
  callerId = from;
  // Show incoming call popup
  document.getElementById("incomingCall").style.display = "block";

  // Accept button
  document.getElementById("acceptBtn").onclick = async () => {
    document.getElementById("incomingCall").style.display = "none";

    pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localAudio.srcObject = localStream;
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

    pc.ontrack = (event) => { remoteAudio.srcObject = event.streams[0]; };
    pc.onicecandidate = (event) => {
      if (event.candidate) socket.emit("ice-candidate", { targetId: callerId, candidate: event.candidate });
    };

    await pc.setRemoteDescription(offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket.emit("answer-call", { targetId: callerId, answer });
  };

  // Reject button
  document.getElementById("rejectBtn").onclick = () => {
    document.getElementById("incomingCall").style.display = "none";
    socket.emit("reject-call", { targetId: callerId });
    callerId = null;
  };
});

// Simple UI: tabs
tabSignup.onclick = () => { tabSignup.classList.add('active'); tabLogin.classList.remove('active'); document.getElementById('signupForm').style.display='block'; document.getElementById('loginForm').style.display='none'; }
tabLogin.onclick = () => { tabLogin.classList.add('active'); tabSignup.classList.remove('active'); document.getElementById('signupForm').style.display='none'; document.getElementById('loginForm').style.display='block'; }

// Signup
btnSignup.onclick = async () => {
  su_msg.textContent = '';
  const username = su_username.value.trim();
  const password = su_password.value;
  if (!username || !password) { su_msg.textContent = 'Enter username and password'; return; }

  try {
    const res = await fetch('/signup', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) { su_msg.textContent = data.error || 'Signup failed'; return; }
    // auto-login after signup
    token = data.token;
    me = { id: data.id, username: data.username };
    onAuthenticated();
  } catch (e) { su_msg.textContent = 'Network error'; }
};

// Login
btnLogin.onclick = async () => {
  li_msg.textContent = '';
  const username = li_username.value.trim();
  const password = li_password.value;
  if (!username || !password) { li_msg.textContent = 'Enter username and password'; return; }

  try {
    const res = await fetch('/login', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) { li_msg.textContent = data.error || 'Login failed'; return; }
    token = data.token;
    me = { id: data.id, username: data.username };
    onAuthenticated();
  } catch (e) { li_msg.textContent = 'Network error'; }
};

function onAuthenticated() {
  // hide auth, show app
  authPanel.style.display = 'none';
  appPanel.style.display = 'block';
  meName.textContent = me.username;
  // tell socket about our token
  socket.emit('auth', { token });
}

// receive users list
socket.on('users', (list) => {
  users = list;
  renderUsers();
});

// render contacts
function renderUsers() {
  usersList.innerHTML = '';
  users.forEach(u => {
    if (u.id === me?.id) return;
    const item = document.createElement('div');
    item.className = 'userItem';
    item.innerHTML = `
      <div class="meta">
        <div style="font-weight:600">${u.username}</div>
        <div class="${u.online ? 'online' : 'offline'}">${u.online ? 'online' : 'offline'}</div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btnChat">Chat</button>
        <button class="btnCall">${u.online ? 'Call' : 'Offline'}</button>
      </div>
    `;
    usersList.appendChild(item);

    const btnChat = item.querySelector('.btnChat');
    const btnCall = item.querySelector('.btnCall');

    btnChat.onclick = () => {
      currentTarget = u;
      chatHeader.textContent = `Chat with ${u.username}`;
      messagesEl.innerHTML = '';
    };

    btnCall.onclick = () => {
      if (!u.online) { alert('User offline'); return; }
      currentTarget = u;
      startCallWith(u.id, u.username);
    };
  });
}

// Direct message send
sendBtn.onclick = () => {
  if (!currentTarget) return alert('Select a user to chat');
  const txt = chatInput.value.trim();
  if (!txt) return;
  const payload = {
    toUserId: currentTarget.id,
    text: txt,
    fromUserId: me.id,
    fromUsername: me.username,
    at: Date.now()
  };
  socket.emit('direct-message', payload);
  appendMessage(payload, true);
  chatInput.value = '';
};

socket.on('direct-message', (payload) => {
  // if it's from the user we're currently chatting with, append, else the UI won't show (for brevity)
  appendMessage(payload, false);
});

function appendMessage(p, isMe) {
  const row = document.createElement('div');
  row.className = 'msgRow';
  row.innerHTML = `<div style="font-size:12px;color:var(--muted)">${p.fromUsername} • ${new Date(p.at).toLocaleTimeString()}</div><div>${p.text}</div>`;
  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Logout
btnLogout.onclick = () => {
  token = null;
  me = null;
  currentTarget = null;
  authPanel.style.display = 'block';
  appPanel.style.display = 'none';
  socket.disconnect();
  setTimeout(()=> location.reload(), 100);
};

/* ---------------- WebRTC call logic ---------------- */
let pc = null;
let localStream = null;
let remoteStream = null;

async function startCallWith(targetUserId, targetUsername) {
  if (!me) return alert('Not signed in');
  // Notify server to ring user
  socket.emit('call-user', { toUserId: targetUserId, fromUserId: me.id, fromUsername: me.username });
  chatHeader.textContent = `Calling ${targetUsername}...`;
  // we will wait for them to create an offer or accept. In our flow, the callee will get incoming-call and we'll negotiate.
}

// When someone calls me
socket.on("incoming-call", async ({ from, offer }) => {
  // Show notification: "User is calling..."
  if (confirm("Someone is calling you. Accept?")) {
    pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localAudio.srcObject = localStream;
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

    pc.ontrack = (event) => { remoteAudio.srcObject = event.streams[0]; };
    pc.onicecandidate = (event) => {
      if (event.candidate) socket.emit("ice-candidate", { targetId: from, candidate: event.candidate });
    };

    await pc.setRemoteDescription(offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit("answer-call", { targetId: from, answer });
  } else {
    alert("Call rejected");
  }
});

// When my call is accepted
socket.on("call-accepted", async ({ answer }) => {
  await pc.setRemoteDescription(answer);
});

// Handle ICE
socket.on("ice-candidate", async ({ candidate }) => {
  if (pc) await pc.addIceCandidate(candidate);
});

// Caller
startCallBtn.addEventListener("click", async () => {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  socket.emit("call-user", { to: targetUserId, offer });
});

// Callee
socket.on("incoming-call", async ({ from, offer }) => {
  // Show popup: "User is calling... Accept?"
  if (confirm("Incoming call! Accept?")) {
    pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit("answer-call", { to: from, answer });
  }
});

socket.on("call-answered", async ({ answer }) => {
  await pc.setRemoteDescription(new RTCSessionDescription(answer));
});

// Caller receives webrtc-offer
socket.on('webrtc-offer', async ({ fromSocket, offer }) => {
  console.log('webrtc-offer arrived');
  // Caller side may not need this path if callee creates answer; however we route offers by user id, not socket, so we pass
  if (!pc) {
    await prepareLocalPeer(currentTarget?.id);
  }
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  socket.emit('webrtc-answer', { toUserId: currentTarget.id, answer });
});

// Callee sends answer back, caller handles it
socket.on('webrtc-answer', async ({ fromSocket, answer }) => {
  console.log('webrtc-answer arrived');
  if (pc) {
    await pc.setRemoteDescription(answer);
  }
});

// ICE candidate exchange
socket.on('webrtc-ice-candidate', async ({ fromSocket, candidate }) => {
  if (pc && candidate) {
    try { await pc.addIceCandidate(candidate); } catch (e) { console.warn('ice add err', e); }
  }
});

// helper: prepare RTCPeerConnection and local stream
async function prepareLocalPeer(targetUserId) {
  if (!targetUserId) throw new Error('targetUserId required');
  if (pc) { pc.close(); pc = null; }
  pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
  remoteStream = new MediaStream();
  remoteAudio.srcObject = remoteStream;

  pc.ontrack = (ev) => {
    ev.streams[0].getTracks().forEach(t => remoteStream.addTrack(t));
  };
  pc.onicecandidate = (ev) => {
    if (ev.candidate) {
      socket.emit('webrtc-ice-candidate', { toUserId: targetUserId, candidate: ev.candidate });
    }
  };

  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  localAudio.srcObject = localStream;
  localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
}

// Callee flow: when accepting a call, create offer? We'll have callee create offer or caller creates it.
// We'll implement caller creates offer after emitting 'call-user' — to simplify, when server emits incoming-call to callee and callee accepts,
// callee will prepare peer, create offer and send to caller (opposite of typical flow). Either side can offer; both must handle both paths.
async function initiateCallAsCallee() {
  if (!currentTarget) return;
  await prepareLocalPeer(currentTarget.id);
  // create offer as callee in this flow
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  socket.emit('webrtc-offer', { toUserId: currentTarget.id, offer });
  chatHeader.textContent = `In call with ${currentTarget.username}`;
  hangupBtn.disabled = false;
}

// Optional: caller can directly prepare and create offer too (if desired). Here we let callee offer after accepting.
// Hangup
hangupBtn.onclick = () => {
  if (pc) pc.close();
  pc = null;
  if (localStream) localStream.getTracks().forEach(t => t.stop());
  localStream = null;
  remoteAudio.srcObject = null;
  localAudio.srcObject = null;
  hangupBtn.disabled = true;
  chatHeader.textContent = 'Call ended';
};
