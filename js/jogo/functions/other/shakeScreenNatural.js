function shakeScreenNatural(maxIntensity = 20, duration = 600) {
  const container = document.body; // ou outro container principal
  const start = Date.now();

  function step() {
    const elapsed = Date.now() - start;
    const progress = elapsed / duration;

    if (progress < 1) {
      // intensidade diminui com o tempo (ease out)
      const intensity = maxIntensity * (1 - progress);
      const x = (Math.random() * 2 - 1) * intensity;
      const y = (Math.random() * 2 - 1) * intensity;
      container.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(step);
    } else {
      // reseta posição
      container.style.transform = '';
    }
  }
  step();
};