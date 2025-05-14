// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "DEINE_API_KEY",
  authDomain: "DEIN_AUTH_DOMAIN",
  projectId: "DEIN_PROJECT_ID",
  // Weitere Konfigurationsparameter
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sprachübersetzungen
const translations = {
  de: {
    intro: "Willkommen bei Drawly",
    linkPlaceholder: "Link zum Social Media Post eingeben",
    previewButton: "Vorschau",
    criteriaTitle: "Teilnahmekriterien auswählen",
    winnerTitle: "🎉 Gewinner 🎉",
    screenshot: "Screenshot speichern",
  },
  // Weitere Sprachen...
};

// Sprachwechsel
function changeLanguage(lang) {
  const t = translations[lang];
  document.getElementById("intro").textContent = t.intro;
  document.getElementById("postLink").placeholder = t.linkPlaceholder;
  document.querySelector("#screen1 button").textContent = t.previewButton;
  document.querySelector("#screen3 h2").textContent = t.criteriaTitle;
  document.getElementById("winnerTitle").textContent = t.winnerTitle;
  document.querySelector("#screen4 button").textContent = t.screenshot;
}

// Bildschirmwechsel
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.add("hidden");
  });
  document.getElementById(screenId).classList.remove("hidden");
}

// Auslosung starten
function startDraw() {
  const dummyComments = ["@anna", "@max", "@sarah", "@leo", "@nina"];
  const winner = dummyComments[Math.floor(Math.random() * dummyComments.length)];
  const timestamp = new Date().toISOString();
  const hash = btoa(`${winner}-${timestamp}`);
  document.getElementById("winnerImage").src = "images/profile-placeholder.png";
  document.getElementById("winnerDisplay").innerHTML =
    `<strong>${winner}</strong><br><small>Zeitstempel: ${timestamp}</small><br><small>Verifizierungscode: ${hash}</small>`;
  showScreen("screen4");
  triggerConfetti();
}

// Konfetti-Effekt
function triggerConfetti() {
  const emoji = ["🎉", "✨", "🎊", "🌟"];
  for (let i = 0; i < 30; i 
      for (let i = 0; i < 30; i++) {
    const el = document.createElement("div");
    el.textContent = emoji[Math.floor(Math.random() * emoji.length)];
    el.style.position = "fixed";
    el.style.top = Math.random() * -20 + "px";
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = "24px";
    el.style.animation = "fall 2s ease-out forwards";
    el.style.zIndex = 9999;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
}

// Screenshot-Funktion
function takeScreenshot() {
  html2canvas(document.getElementById("screen4")).then(canvas => {
    const link = document.createElement("a");
    link.download = "drawly-winner.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Firebase-Auth Funktionen
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("userStatus").textContent = "Erfolgreich registriert: " + userCredential.user.email;
    })
    .catch((error) => {
      document.getElementById("userStatus").textContent = error.message;
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("userStatus").textContent = "Eingeloggt als: " + userCredential.user.email;
    })
    .catch((error) => {
      document.getElementById("userStatus").textContent = error.message;
    });
}

function logout() {
  auth.signOut()
    .then(() => {
      document.getElementById("userStatus").textContent = "Erfolgreich ausgeloggt";
    });
}

// Sprache initial setzen
document.addEventListener("DOMContentLoaded", () => {
  const lang = navigator.language.slice(0, 2);
  changeLanguage(translations[lang] ? lang : "en");
});
