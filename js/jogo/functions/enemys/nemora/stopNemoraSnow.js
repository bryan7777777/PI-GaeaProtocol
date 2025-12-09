function stopNemoraSnow() {
  const container = document.getElementById("nemoraSnow");
  if (!container) return;

  container.style.display = "none";

  clearInterval(nemoraSnowInterval);
  nemoraSnowInterval = null;

  container.innerHTML = "";
};