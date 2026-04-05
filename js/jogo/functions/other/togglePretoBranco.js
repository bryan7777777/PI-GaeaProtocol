function togglePretoBranco() {
  const html = document.documentElement;
  
  if (html.style.filter === "grayscale(100%)") {
    html.style.filter = "none";
  } else {
    html.style.filter = "grayscale(100%)";
  }
}