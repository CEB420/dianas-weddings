// Cookie-Einwilligung für Google Ads (Google Tag Manager GTM-KTH72BHM).
// Der Tag Manager wird erst nach „Akzeptieren“ geladen. Die Wahl liegt im localStorage.
const GTM_ID = "GTM-KTH72BHM";
const CONSENT_KEY = "dw-consent";

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
});

function readConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function saveConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Ohne Speicher gilt die Wahl nur für diesen Seitenaufruf.
  }
}

let gtmLoaded = false;

function loadTagManager() {
  if (gtmLoaded) return;
  gtmLoaded = true;
  gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.append(script);
}

const banner = document.createElement("section");
banner.className = "consent-banner";
banner.setAttribute("aria-label", "Cookie-Einstellungen");
banner.hidden = true;
banner.innerHTML = `
  <p>
    Ich nutze Cookies von Google Ads, um zu sehen, ob eure Anfrage über eine meiner Anzeigen kam.
    Das passiert nur, wenn ihr zustimmt. Mehr dazu in der <a href="datenschutz.html#cookies">Datenschutzerklärung</a>.
  </p>
  <div class="consent-banner__actions">
    <button type="button" class="consent-banner__button" data-consent-choice="denied">Ablehnen</button>
    <button type="button" class="consent-banner__button" data-consent-choice="granted">Akzeptieren</button>
  </div>
`;
document.body.append(banner);

banner.querySelectorAll("[data-consent-choice]").forEach((button) =>
  button.addEventListener("click", () => {
    const choice = button.dataset.consentChoice;
    const hadGranted = readConsent() === "granted";
    saveConsent(choice);
    banner.hidden = true;
    if (choice === "granted") {
      loadTagManager();
    } else if (hadGranted || gtmLoaded) {
      // Widerruf: neu laden, damit der Tag Manager nicht mehr aktiv ist.
      window.location.reload();
    }
  }),
);

document.querySelectorAll("[data-consent-open]").forEach((button) =>
  button.addEventListener("click", () => {
    banner.hidden = false;
    banner.querySelector("button").focus();
  }),
);

const storedConsent = readConsent();
if (storedConsent === "granted") {
  loadTagManager();
} else if (storedConsent !== "denied") {
  banner.hidden = false;
}
