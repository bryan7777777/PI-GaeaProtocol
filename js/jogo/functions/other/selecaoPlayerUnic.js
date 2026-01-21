// SELECAO
// --- SELEÇÃO DE PERSONAGEM (um por vez) ---
personagens.forEach(img => {
  img.addEventListener("click", () => {

    // remove seleção de TODOS os imgs
    personagens.forEach(p => p.classList.remove("selecionado"));

    // adiciona SOMENTE no img clicado
    img.classList.add("selecionado");

    // salva o id no escopo global
    personagemSelecionado = img.id;

    // debug opcional
    console.log("Selecionado:", personagemSelecionado);
  });
});
