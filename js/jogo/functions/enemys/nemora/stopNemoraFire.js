function stopNemoraFire() {
  const container = document.getElementById("nemoraFire");
  if (!container) return;

  container.style.display = "none";

  clearInterval(nemoraFireInterval);
  nemoraFireInterval = null;

  container.innerHTML = "";
};