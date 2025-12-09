// SELECAO
// --- SELEÇÃO DE PERSONAGEM (um por vez) ---
personagens.forEach(img => {
  img.addEventListener("click", () => {
    // Remove seleção anterior
    personagens.forEach(p => p.classList.remove("selecionado"));

    // Marca o atual
    img.classList.add("selecionado");
    personagemSelecionado = img.id;
  });
});