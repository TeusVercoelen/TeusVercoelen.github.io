
document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("#language-toggle a");
  const icon = document.getElementById("language-icon");

  if (!button || !icon) return;

  const currentLanguage =
    document.querySelector('meta[name="site-language"]')?.content || "en";

  const translationKey =
    document.querySelector('meta[name="translation-key"]')?.content || "";

  const currentPageUrl =
    document.querySelector('meta[name="current-page-url"]')?.content || "/";

  const targetLanguage = currentLanguage === "nl" ? "en" : "nl";

  // Update contact form link according to the current language.
  const contactLink = document.querySelector(
    'a[href="/en/contact/"]'
  );

  if (contactLink) {
    contactLink.href =
      currentLanguage === "nl"
        ? "/nl/contact/"
        : "/en/contact/";
  }

  icon.textContent = currentLanguage === "nl" ? "🇳🇱" : "🇬🇧";

  button.setAttribute(
    "aria-label",
    targetLanguage === "nl" ? "Switch to Dutch" : "Switch to English"
  );

  button.addEventListener("click", function (event) {
    event.preventDefault();
    
    // Preserve the missing URL when switching languages on a 404 page.
    const missingUrl = new URLSearchParams(window.location.search).get("missing");
    const is404 = translationKey === "not_found";

    const pages = window.siteTranslations || {};

    // Navigate to the matching translated page, if available.
    if (translationKey && pages[translationKey]?.[targetLanguage]) {
      window.location.href =
        pages[translationKey][targetLanguage] +
        (is404 && missingUrl
          ? "?missing=" + encodeURIComponent(missingUrl)
          : "");
      return;
    }

    // No Dutch translation exists: remain on the current page.
    if (targetLanguage === "nl") {
      window.location.href = currentPageUrl;
      return;
    }

    // Switching from Dutch to English: try the equivalent English URL.
    window.location.href = currentPageUrl.replace(/^\/nl\//, "/en/");
  });
});
