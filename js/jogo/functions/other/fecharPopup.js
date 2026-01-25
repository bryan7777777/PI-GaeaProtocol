function fecharPopup() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  overlay.classList.remove("popup-opacity");
  document.getElementById("popup").style.display = "none";
};