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
const architectureLightbox = document.querySelector("[data-lightbox]");
const architectureLightboxImage = document.querySelector("[data-lightbox-image]");
const architectureLightboxTriggers = document.querySelectorAll("[data-lightbox-src]");
const architectureLightboxClosers = document.querySelectorAll("[data-lightbox-close]");

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

const closeArchitectureLightbox = () => {
  if (!architectureLightbox || !architectureLightboxImage) {
    return;
  }

  architectureLightbox.hidden = true;
  architectureLightboxImage.src = "";
  architectureLightboxImage.alt = "";
  document.body.classList.remove("is-lightbox-open");
};

architectureLightboxTriggers.forEach((button) => {
  button.addEventListener("click", () => {
    if (!architectureLightbox || !architectureLightboxImage) {
      return;
    }

    const image = button.querySelector("img");
    const src = button.dataset.lightboxSrc;

    if (!src) {
      return;
    }

    architectureLightboxImage.src = src;
    architectureLightboxImage.alt = image?.alt || "Enlarged architecture photo";
    architectureLightbox.hidden = false;
    document.body.classList.add("is-lightbox-open");
  });
});

architectureLightboxClosers.forEach((button) => {
  button.addEventListener("click", closeArchitectureLightbox);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeArchitectureLightbox();
  }
});
