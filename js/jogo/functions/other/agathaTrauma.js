let hospitalMelancholyInterval = null;

function startHospitalMelancholy() {

  const container = document.getElementById("hospitalMelancholy");
  if (!container) return;

  // 🔥 AGORA SÓ APARECE AO ATIVAR
  container.style.display = "block";

  if (hospitalMelancholyInterval) return;

  hospitalMelancholyInterval = setInterval(() => {

    const particle = document.createElement("div");

    const types = [
      "dust",
      "fog",
      "ash"
    ];

    const type = types[Math.floor(Math.random() * types.length)];

    particle.classList.add("hospital-particle", type);

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = (-10 + Math.random() * 10) + "vh";

    let size = 0;

    switch(type){

      case "dust":
        size = 2 + Math.random() * 4;
      break;

      case "fog":
        size = 80 + Math.random() * 120;
      break;

      case "ash":
        size = 6 + Math.random() * 10;
      break;

    }

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    const duration = 8 + Math.random() * 10;

    particle.style.animationDuration = duration + "s";

    const drift = (-20 + Math.random() * 40);

    particle.style.setProperty("--drift", drift + "vw");

    particle.style.opacity = 0.05 + Math.random() * 0.25;

    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, duration * 1000);

  }, 120);
}

function stopHospitalMelancholy() {

  const container = document.getElementById("hospitalMelancholy");
  if (!container) return;

  // 🔥 ESCONDE TOTALMENTE
  container.style.display = "none";

  clearInterval(hospitalMelancholyInterval);

  hospitalMelancholyInterval = null;

  container.innerHTML = "";
}