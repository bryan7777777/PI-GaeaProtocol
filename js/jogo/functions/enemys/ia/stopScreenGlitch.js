function stopScreenGlitch() {
  const body = document.body;
  setTimeout(() => {
    body.classList.remove("screen-glitch");
  }, 150);
};