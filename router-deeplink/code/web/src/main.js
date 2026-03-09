import "./styles.css";
import { GROQ_API_KEY } from "./config.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <div id="splash" class="splash">Router Deep Link</div>
  <div class="container">
    <h1>Deep Link Launcher</h1>
    <p class="note">Replace the scheme with your app scheme.</p>

    <button data-link="routerapp://home">Open Home</button>
    <button data-link="routerapp://explore?filter=active&sort=newest">Open Explore (filtered)</button>
    <button data-link="routerapp://profile?toggle=notifications&value=true">Open Profile + Toggle</button>

    <p class="hint">If nothing happens, the app may not be installed or the scheme is different.</p>
  </div>
`;

app.addEventListener("click", (event) => {
  const target = event.target;
  if (target && target.dataset && target.dataset.link) {
    const url = target.dataset.link;
    // Attempt to open the app; show a hint if nothing happens.
    window.location.href = url;
    setTimeout(() => {
      alert("If the app did not open, make sure it is installed and the scheme is registered.");
    }, 800);
  }
});

// Simple splash fade out after initial render
setTimeout(() => {
  const splash = document.getElementById("splash");
  if (splash) splash.remove();
}, 900);

// Placeholder usage to make sure the build-time env is wired.
if (!GROQ_API_KEY) {
  // No-op: avoid logging secrets in production.
}
