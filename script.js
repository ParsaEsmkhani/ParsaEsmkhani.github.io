const year = document.querySelector("#current-year");

if (year) {
  year.textContent = new Date().getFullYear().toString();
}

const musicEmbeds = document.querySelectorAll("[data-music-embed]");

const loadMusicEmbed = (shell) => {
  if (!shell || shell.dataset.loaded === "true") {
    return;
  }

  const src = shell.dataset.src;

  if (!src) {
    return;
  }

  shell.dataset.loaded = "true";

  const iframe = document.createElement("iframe");
  iframe.className = "apple-music-embed";
  iframe.allow = "autoplay *; encrypted-media *; fullscreen *; clipboard-write";
  iframe.frameBorder = "0";
  iframe.height = "450";
  iframe.loading = "lazy";
  iframe.sandbox =
    "allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation";
  iframe.src = src;
  iframe.title = "Tron: Legacy Apple Music player";

  shell.replaceWith(iframe);
};

musicEmbeds.forEach((shell) => {
  const button = shell.querySelector("[data-load-music]");
  button?.addEventListener("click", () => loadMusicEmbed(shell));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        observer.disconnect();

        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(() => loadMusicEmbed(shell), { timeout: 1200 });
          return;
        }

        window.setTimeout(() => loadMusicEmbed(shell), 300);
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(shell);
  }
});

const architectureGallery = document.querySelector(".architecture-gallery");
const architectureControls = document.querySelectorAll("[data-gallery-scroll]");

architectureControls.forEach((button) => {
  button.addEventListener("click", () => {
    if (!architectureGallery) {
      return;
    }

    const direction = button.dataset.galleryScroll === "previous" ? -1 : 1;
    const slide = architectureGallery.querySelector(".architecture-slide");
    const distance = slide ? slide.getBoundingClientRect().width + 14 : 360;

    architectureGallery.scrollBy({
      behavior: "smooth",
      left: direction * distance,
    });
  });
});
