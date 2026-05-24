// const apiBase = "http://localhost:5000/api";
// const audio = document.getElementById("audioPlayer");
// const disk = document.getElementById("diskImage");
// const subscriptionStatus = document.getElementById("subscriptionStatus");
// let currentLikes = 0;
// // 🌀 Disk rotation control
// audio.addEventListener("play", () => {
//   disk.style.animationPlayState = "running";
// });
// audio.addEventListener("pause", () => {
//   disk.style.animationPlayState = "paused";
// });
// audio.addEventListener("ended", () => {
//   disk.style.animationPlayState = "paused";
// });
// // 🎛 Change playback speed + disk spin
// function changeSpeed(speed) {
//   audio.playbackRate = speed;
//   const spinSpeed = (3 / speed).toFixed(2);
//   disk.style.animationDuration = `${spinSpeed}s`;
// }
// // 🎤 Load uploaded songs
// async function loadUploads() {
//   try {
//     const res = await fetch(`${apiBase}/uploads`);
//     const uploads = await res.json();
//     const container = document.getElementById("uploadsContainer");
//     if (!container) return;
//     container.innerHTML = "";
//     uploads.forEach(u => {
//       const div = document.createElement("div");
//       div.className = "song-item";
//       div.innerHTML = `
//         <p><b>${u.title}</b> by ${u.userId?.username || "Unknown"} - ❤️ ${u.likes}</p>
//         <button onclick="playSong('http://localhost:5000${u.fileUrl}', '${u.title}')">▶️ Play</button>
//         <button onclick="likeUpload('${u._id}')">❤️ Like</button>
//       `;
//       container.appendChild(div);
//     });
//   } catch (err) {
//     console.error("Error loading uploads:", err);
//   }
// }
// // ▶️ Play selected song
// function playSong(url, title) {
//   audio.src = url;
//   audio.play();
//   disk.style.animationPlayState = "running";
//   document.querySelector("header h1").innerText = `🎶 Now Playing: ${title}`;
// }
// // ❤️ Like uploaded song
// async function likeUpload(id) {
//   try {
//     const res = await fetch(`${apiBase}/uploads/${id}/like`, { method: "PUT" });
//     if (res.ok) {
//       currentLikes++;
//       updateSubscription();
//       loadUploads();
//     }
//   } catch (err) {
//     console.error("Error liking upload:", err);
//   }
// }
// // 💎 Subscription logic
// function updateSubscription() {
//   if (currentLikes >= 10) {
//     subscriptionStatus.textContent = "💎 Subscription Active: 5 Days Free!";
//     subscriptionStatus.style.color = "#00ff90";
//   } else {
//     subscriptionStatus.textContent = `💎 Subscription: ${currentLikes}/10 Likes (Get 5 Days Free!)`;
//   }
// }
// // 🎯 Redirect after upload
// function handleUploadSuccess() {
//   alert("✅ Song uploaded successfully!");
//   window.location.href = "index.html";
// }
// // 🎯 Auto-load on start
// window.onload = () => {
//   loadUploads();
//   updateSubscription();
// };



const apiBase = "http://localhost:5000/api";
const audio = document.getElementById("audioPlayer");
const disk = document.getElementById("diskImage");
const subscriptionStatus = document.getElementById("subscriptionStatus");
let currentLikes = 0;

// 🌀 Disk rotation control
audio.addEventListener("play", () => {
  disk.style.animationPlayState = "running";
});
audio.addEventListener("pause", () => {
  disk.style.animationPlayState = "paused";
});
audio.addEventListener("ended", () => {
  disk.style.animationPlayState = "paused";
});

// 🎛 Change playback speed + disk spin
function changeSpeed(speed) {
  audio.playbackRate = speed;
  const spinSpeed = (3 / speed).toFixed(2);
  disk.style.animationDuration = `${spinSpeed}s`;
}

// 🎤 Load uploaded songs
async function loadUploads() {
  try {
    const res = await fetch(`${apiBase}/uploads`);
    const uploads = await res.json();
    const container = document.getElementById("uploadsContainer");
    if (!container) return;
    container.innerHTML = "";
    uploads.forEach(u => {
      const div = document.createElement("div");
      div.className = "song-item";
      div.innerHTML = `
        <p><b>${u.title}</b> by ${u.userId?.username || "Unknown"} - ❤️ ${u.likes}</p>
        <button onclick="playSong('http://localhost:5000${u.fileUrl}', '${u.title}')">▶️ Play</button>
        <button onclick="likeUpload('${u._id}')">❤️ Like</button>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading uploads:", err);
  }
}

// ▶️ Play selected song
function playSong(url, title) {
  audio.src = url;
  audio.play();
  disk.style.animationPlayState = "running";
  document.querySelector("header h1").innerText = `🎶 Now Playing: ${title}`;
}

// ❤️ Like uploaded song
async function likeUpload(id) {
  try {
    const res = await fetch(`${apiBase}/uploads/${id}/like`, { method: "PUT" });
    if (res.ok) {
      currentLikes++;
      updateSubscription();
      loadUploads();
    }
  } catch (err) {
    console.error("Error liking upload:", err);
  }
}

// 💎 Subscription logic (✅ modified section)
function updateSubscription() {
  if (currentLikes >= 10) {
    subscriptionStatus.textContent = "💎 Subscription Active: 5 Days Free!";
    subscriptionStatus.style.color = "#00ff90";

    // ⭐ Redirect to success page after 2 seconds
    setTimeout(() => {
      window.location.href = "subscription-success.html";
    }, 2000);
  } else {
    subscriptionStatus.textContent = `💎 Subscription: ${currentLikes}/10 Likes (Get 5 Days Free!)`;
  }
}

// 🎯 Redirect after upload
function handleUploadSuccess() {
  alert("✅ Song uploaded successfully!");
  window.location.href = "index.html";
}

// 🎯 Auto-load on start
window.onload = () => {
  loadUploads();
  updateSubscription();
};
