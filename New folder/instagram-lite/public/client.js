const socket = io();

// UI elements
const nameEl = document.getElementById('name');
const roomEl = document.getElementById('roomId');
const joinBtn = document.getElementById('joinBtn');
const messagesEl = document.getElementById('messages');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');
const startCallBtn = document.getElementById('startCallBtn');
const hangupBtn = document.getElementById('hangupBtn');

let me = null;
let roomId = null;

// === Join Room ===
joinBtn.addEventListener("click", () => {
  me = nameEl.value.trim();
  roomId = roomEl.value.trim();

  if (!me || !roomId) return alert("Enter name + room ID");

  socket.emit("joinRoom", { roomId, name: me });
  addSystem(`You joined room ${roomId}`);
  startCallBtn.disabled = false;
});

// === Send Message ===
sendBtn.addEventListener("click", () => {
  if (!msgInput.value.trim()) return;

  const msg = { user: me, text: msgInput.value, at: Date.now(), roomId };
  socket.emit("chatMessage", msg);
  // also add locally
  msgInput.value = "";
});

// === Receive Messages ===
socket.on("chatMessage", (msg) => {
  addMessage(msg);
});

// === Helpers ===
function addMessage({ user, text, at }) {
  const d = new Date(at);
  const div = document.createElement("div");
  div.className = "msg";
  div.innerHTML = `<div class="meta">${user} • ${d.toLocaleTimeString()}</div><div>${text}</div>`;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addSystem(text) {
  const div = document.createElement("div");
  div.className = "msg";
  div.style.opacity = 0.7;
  div.innerHTML = `<div class="meta">system</div><div>${text}</div>`;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}
