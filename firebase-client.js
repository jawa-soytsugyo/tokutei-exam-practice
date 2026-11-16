import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  signInWithRedirect,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js?v=20260729-6";

const requiredConfig = ["apiKey", "authDomain", "projectId", "appId"];
const configReady = requiredConfig.every((key) => Boolean(firebaseConfig[key]));
let currentUser = null;
let resolveReady;
let rejectReady;
let readySettled = false;
const contentMemoryCache = new Map();
const FIRESTORE_TIMEOUT_MS = 8000;
const CONTENT_CACHE_VERSION = "v3";
const authCopy = {
  uz: {
    user: "Foydalanuvchi", signOut: "Chiqish", login: "Google bilan kirish",
    opening: "Google ochilmoqda...", retry: "Qayta urinish"
  },
  ja: {
    user: "利用者", signOut: "ログアウト", login: "Googleでログイン",
    opening: "Googleを開いています…", retry: "もう一度試す"
  },
  en: {
    user: "User", signOut: "Sign out", login: "Sign in with Google",
    opening: "Opening Google…", retry: "Try again"
  },
  ne: {
    user: "प्रयोगकर्ता", signOut: "लगआउट", login: "Google मार्फत लगइन",
    opening: "Google खोलिँदै छ…", retry: "फेरि प्रयास गर्नुहोस्"
  },
  my: {
    user: "အသုံးပြုသူ", signOut: "ထွက်ရန်", login: "Google ဖြင့် ဝင်ရောက်ရန်",
    opening: "Google ဖွင့်နေသည်…", retry: "ထပ်မံကြိုးစားပါ"
  }
};

function currentAuthCopy() {
  return authCopy[localStorage.getItem("language")] || authCopy.ja;
}

export const ready = new Promise((resolve, reject) => {
  resolveReady = resolve;
  rejectReady = reject;
});

function settleReady(user) {
  if (readySettled) return;
  readySettled = true;
  resolveReady(user);
}

function withTimeout(promise, timeoutMs = FIRESTORE_TIMEOUT_MS) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Firebase request timed out.")), timeoutMs);
    })
  ]);
}

function readContentCache(key) {
  if (contentMemoryCache.has(key)) return contentMemoryCache.get(key);
  try {
    const cached = sessionStorage.getItem(`firebase-content:${CONTENT_CACHE_VERSION}:${key}`);
    if (!cached) return undefined;
    const value = JSON.parse(cached);
    contentMemoryCache.set(key, value);
    return value;
  } catch {
    return undefined;
  }
}

function writeContentCache(key, value) {
  contentMemoryCache.set(key, value);
  try {
    sessionStorage.setItem(`firebase-content:${CONTENT_CACHE_VERSION}:${key}`, JSON.stringify(value));
  } catch {
    // Large datasets may exceed sessionStorage. The in-memory cache still works.
  }
}

function injectStyles() {
  if (document.getElementById("firebaseStudyStyles")) return;
  const style = document.createElement("style");
  style.id = "firebaseStudyStyles";
  style.textContent = `
    .firebase-auth-gate {
      position: fixed; inset: 0; z-index: 2147483646; display: grid; place-items: center;
      padding: 24px; background: rgba(15,23,42,.85);
      font-family: inherit;
    }
    .firebase-auth-card {
      width: min(100%, 430px); padding: 32px; border-radius: 18px; background: var(--card, #fff);
      color: var(--text, #172033); box-shadow: 0 24px 64px rgba(0,0,0,.3); text-align: center;
    }
    .firebase-auth-card h2 { margin: 0 0 10px; font-size: 1.8rem; }
    .firebase-auth-card p { margin: 0 0 22px; color: var(--muted, #637084); line-height: 1.55; }
    .firebase-google-button {
      width: 100%; min-height: 48px; border: 0; border-radius: 10px; padding: 12px 16px;
      background: var(--primary, #4338ca); color: #fff; font: inherit; font-weight: 800; cursor: pointer;
    }
    .firebase-google-button:disabled { opacity: .65; cursor: wait; }
    .firebase-auth-error { min-height: 1.4em; margin-top: 14px; color: #b42318; font-size: .9rem; }
    .firebase-userbar {
      position: fixed; right: 14px; bottom: 14px; z-index: 2147483000; display: flex;
      align-items: center; gap: 9px; max-width: min(330px, calc(100% - 28px)); padding: 8px 10px;
      border: 1px solid var(--line, #e2e8f0); border-radius: 999px; background: var(--card, #ffffff);
      color: var(--text, #0f172a); box-shadow: 0 10px 28px rgba(0,0,0,.15); font-family: inherit;
    }
    .firebase-userbar img { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; background: var(--card, #fff); }
    .firebase-userbar span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: .86rem; font-weight: 750; }
    .firebase-userbar button {
      flex: 0 0 auto; border: 1px solid var(--line, #e2e8f0); border-radius: 999px;
      padding: 6px 9px; background: color-mix(in srgb, var(--primary, #4338ca) 12%, transparent); color: var(--primary, #4338ca); font: inherit;
      font-size: .78rem; font-weight: 750; cursor: pointer;
    }
    html.dark .firebase-userbar, body.dark .firebase-userbar {
      background: var(--card, #1e293b); color: var(--text, #f1f5f9); border-color: var(--line, #334155);
    }
  `;
  document.head.append(style);
}

function showGate(message) {
  // Never block vocabulary or practice pages when Firebase is unavailable.
  if (message) console.warn(message);
  return document.getElementById("firebaseAuthGate") || document.createElement("section");
}

function legacyShowGate(message) {
  injectStyles();
  let gate = document.getElementById("firebaseAuthGate");
  if (!gate) {
    gate = document.createElement("section");
    gate.id = "firebaseAuthGate";
    gate.className = "firebase-auth-gate";
    gate.innerHTML = `
      <div class="firebase-auth-card">
        <h2>Google orqali kiring</h2>
        <p>Natijalaringiz va o‘qish ma’lumotlaringiz faqat sizning akkauntingizda saqlanadi.</p>
        <button id="firebaseGoogleLogin" class="firebase-google-button" type="button">Google bilan kirish</button>
        <div id="firebaseAuthError" class="firebase-auth-error" aria-live="polite"></div>
      </div>
    `;
    document.body.append(gate);
  }

  const error = document.getElementById("firebaseAuthError");
  if (message && error) error.textContent = message;
  return gate;
}

function hideGate() {
  document.getElementById("firebaseAuthGate")?.remove();
}

function renderUserbar(user, auth) {
  const copy = currentAuthCopy();
  document.getElementById("firebaseUserbar")?.remove();
  const mount = document.getElementById("firebaseAuthControls");
  if (!mount) return;
  mount.replaceChildren();

  if (user.photoURL) {
    const image = document.createElement("img");
    image.className = "auth-avatar";
    image.src = user.photoURL;
    image.alt = "";
    image.referrerPolicy = "no-referrer";
    mount.append(image);
  }

  const name = document.createElement("span");
  name.className = "auth-name";
  name.textContent = user.displayName || user.email || copy.user;
  mount.append(name);

  const button = document.createElement("button");
  button.className = "auth-button";
  button.type = "button";
  button.textContent = copy.signOut;
  button.addEventListener("click", () => signOut(auth));
  mount.append(button);
}

function renderLoginBar(auth, provider) {
  const copy = currentAuthCopy();
  document.getElementById("firebaseUserbar")?.remove();
  const mount = document.getElementById("firebaseAuthControls");
  if (!mount) return;
  mount.replaceChildren();

  const button = document.createElement("button");
  button.className = "auth-button auth-login-button";
  button.type = "button";
  button.textContent = copy.login;
  button.addEventListener("click", async () => {
    button.disabled = true;
    button.textContent = copy.opening;
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Google login failed:", error);
      button.disabled = false;
      button.textContent = copy.retry;
    }
  });
  mount.append(button);
}

function preferenceSnapshot() {
  const fontSize = Number.parseInt(localStorage.getItem("fontSize"), 10);
  return {
    language: localStorage.getItem("language") || "ja",
    theme: localStorage.getItem("theme") || "light",
    fontSize: Number.isFinite(fontSize) ? fontSize : 16,
    studentName: localStorage.getItem("studentName") || ""
  };
}

async function initialize() {
  injectStyles();
  if (!configReady) {
    showGate("Firebase project konfiguratsiyasi hali yozilmagan.");
    rejectReady(new Error("Firebase configuration is incomplete."));
    return;
  }

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  window.FirebaseStudy = Object.freeze({
    get user() {
      return currentUser;
    },
    async loadQuestions(field, language) {
      const key = `questions-${field}-${language}`;
      const cached = readContentCache(key);
      if (Array.isArray(cached)) return cached;
      const snapshot = await withTimeout(getDoc(doc(db, "content", key)));
      const payload = snapshot.exists() ? snapshot.data() : null;
      let items = payload && Array.isArray(payload.items) ? payload.items : [];
      if (!items.length && Array.isArray(payload?.chunkIds) && payload.chunkIds.length) {
        const chunkIds = payload.chunkIds.filter((chunkId) => typeof chunkId === "string" && chunkId);
        const chunks = await withTimeout(Promise.all(chunkIds.map(async (chunkId) => {
          const chunk = await getDoc(doc(db, "content", chunkId));
          return chunk.exists() && Array.isArray(chunk.data().items) ? chunk.data().items : [];
        })));
        items = chunks.flat();
        if (Number.isInteger(payload.count) && items.length !== payload.count) {
          throw new Error(`${key} expected ${payload.count} questions but loaded ${items.length}.`);
        }
      }
      writeContentCache(key, items);
      return items;
    },
    async loadVocabulary(field) {
      const key = `vocabulary-${field}`;
      const cached = readContentCache(key);
      if (cached?.items && Array.isArray(cached.items)) return cached;
      const snapshot = await withTimeout(getDoc(doc(db, "content", key)));
      const vocabulary = snapshot.exists() && Array.isArray(snapshot.data().items)
        ? snapshot.data()
        : null;
      if (vocabulary) writeContentCache(key, vocabulary);
      return vocabulary;
    },
    async recordAnswer(answer) {
      if (!currentUser) return;
      const uid = currentUser.uid;
      const correct = Boolean(answer.correct);
      const safeAnswer = {
        field: String(answer.field || "").slice(0, 40),
        language: String(answer.language || "uz").slice(0, 8),
        questionId: String(answer.questionId || "").slice(0, 160),
        selectedAnswer: String(answer.selectedAnswer || "").slice(0, 500),
        correctAnswer: String(answer.correctAnswer || "").slice(0, 500),
        correct,
        answeredAt: serverTimestamp()
      };
      await Promise.all([
        addDoc(collection(db, "users", uid, "answers"), safeAnswer),
        setDoc(doc(db, "users", uid, "progress", safeAnswer.field), {
          field: safeAnswer.field,
          attempted: increment(1),
          correct: increment(correct ? 1 : 0),
          wrong: increment(correct ? 0 : 1),
          lastAnsweredAt: serverTimestamp()
        }, { merge: true })
      ]);
    },
    async getProgress() {
      if (!currentUser) return {};
      const snapshot = await withTimeout(getDocs(collection(db, "users", currentUser.uid, "progress")));
      return Object.fromEntries(snapshot.docs.map((item) => [item.id, item.data()]));
    },
    async savePreferences() {
      if (!currentUser) return;
      await setDoc(doc(db, "users", currentUser.uid, "settings", "preferences"), {
        ...preferenceSnapshot(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
  });

  await setPersistence(auth, browserLocalPersistence);
  getRedirectResult(auth).catch((redirectError) => {
    console.error("Google redirect login failed:", redirectError);
    showGate("Google login yakunlanmadi. Boshqa Google akkaunt bilan qayta urinib ko‘ring.");
  });

  onAuthStateChanged(auth, async (user) => {
    try {
      currentUser = user;
      if (!user) {
        sessionStorage.removeItem("firebase-authenticated");
        hideGate();
        renderLoginBar(auth, provider);
        settleReady(null);
        window.dispatchEvent(new CustomEvent("firebase-auth-ready", { detail: { user: null } }));
        return;

        sessionStorage.removeItem("firebase-authenticated");
      document.getElementById("firebaseUserbar")?.remove();
        const gate = showGate();
        const button = gate.querySelector("#firebaseGoogleLogin");
        const error = gate.querySelector("#firebaseAuthError");
        button.disabled = false;
        button.textContent = "Google bilan kirish";
        button.addEventListener("click", async () => {
          button.disabled = true;
          button.textContent = "Google sahifasiga o‘tilmoqda...";
          error.textContent = "";
          try {
            await signInWithRedirect(auth, provider);
          } catch (loginError) {
            error.textContent = `Google orqali kirib bo‘lmadi (${loginError.code || "xato"}).`;
            button.disabled = false;
            button.textContent = "Google bilan kirish";
            console.error(loginError);
          }
        }, { once: true });
        return;
      }

      // Make navigation interactive immediately; profile data syncs in the background.
      sessionStorage.setItem("firebase-authenticated", "1");
      hideGate();
      renderUserbar(user, auth);
      settleReady(user);
      window.dispatchEvent(new CustomEvent("firebase-auth-ready", { detail: { user } }));

      const profileSyncKey = `firebase-profile-synced:${user.uid}`;
      if (sessionStorage.getItem(profileSyncKey)) return;
      sessionStorage.setItem(profileSyncKey, "1");

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        lastLoginAt: serverTimestamp()
      }, { merge: true });

      const preferenceDoc = await getDoc(doc(db, "users", user.uid, "settings", "preferences"));
      if (preferenceDoc.exists()) {
        const preferences = preferenceDoc.data();
        ["language", "theme", "studentName"].forEach((key) => {
          if (typeof preferences[key] === "string") localStorage.setItem(key, preferences[key]);
        });
        if (Number.isFinite(preferences.fontSize)) localStorage.setItem("fontSize", String(preferences.fontSize));
      }

    } catch (authStateError) {
      console.error("Authenticated user setup failed:", authStateError);
      if (currentUser) {
        sessionStorage.removeItem(`firebase-profile-synced:${currentUser.uid}`);
        return;
      }
      showGate(`Akkaunt ma’lumotlarini saqlab bo‘lmadi (${authStateError.code || "xato"}).`);
    }
  });

  let preferenceTimer;
  const schedulePreferenceSave = () => {
    clearTimeout(preferenceTimer);
    preferenceTimer = setTimeout(() => window.FirebaseStudy?.savePreferences().catch(console.error), 500);
  };
  document.addEventListener("change", schedulePreferenceSave, true);
  document.addEventListener("click", (event) => {
    if (event.target.closest("#theme, .theme-toggle, .font-button")) {
      schedulePreferenceSave();
    }
  }, true);
}

initialize().catch((error) => {
  console.error(error);
  showGate("Firebase xizmatiga ulanib bo‘lmadi. Internetni tekshirib, sahifani yangilang.");
  rejectReady(error);
});
