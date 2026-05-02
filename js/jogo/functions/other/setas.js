document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("selecaoPlayer");

  const setaCima = document.createElement("button");
  setaCima.classList.add("seta");
  setaCima.classList.add("setaCima");
  setaCima.textContent = "▲";

  const setaBaixo = document.createElement("button");
  setaBaixo.classList.add("seta");
  setaBaixo.classList.add("setaBaixo");
  setaBaixo.textContent = "▼";

  const containerGrupos = document.createElement("div");
  containerGrupos.id = "containerGrupos";
  containerGrupos.classList.add("container-grupos");

  container.appendChild(setaCima);
  container.appendChild(containerGrupos);
  container.appendChild(setaBaixo);
  let faccoes;

  if (pagina === "tutorial.html") {
    faccoes = [
      {
        nome: "GAEA PROTOCOL",
        classe: "gaea",
        personagens: [
          { id: "verde", img: "capaceteverde.png" },
        ]
      },
    ]
  } else {
    faccoes = [
      {
        nome: "CONSELHO DA GAEA",
        classe: "gaea",
        personagens: [
          { id: "gaeaReen", img: "gaeaReen.gif" },
          { id: "laranja", img: "gabriel.gif" },
          { id: "amarelo", img: "bruno.gif" },
          { id: "lucius", img: "lucius.gif" },
          { id: "porto", img: "autoridadeDoPorto.gif" },
          { id: "lilia", img: "lilia.gif" },
          { id: "ferrus", img: "magnusFerrus.gif" },
          
        ]
      },
      {
        nome: "GAEA PROTOCOL",
        classe: "gaea conselho",
        personagens: [
          { id: "verde", img: "capaceteverde.png" },
          { id: "wallace", img: "espectroDaFloresta.jpeg" },
          { id: "malaquias", img: "malaquias.jpg" },
          { id: "x", img: "gemea.jpeg" },
        ]
      },
      // {
      //   nome: "OCEAN PROTOCOL",
      //   classe: "porto",
      //   personagens: [
          
      //     // { id: "azul", img: "capaceteazul.png" },
      //     // { id: "fergus", img: "fergus.jpg" },
      //     // { id: "mercuri", img: "mercuri.jpg" }
      //        { id: "felipe", img: "felipe.jpg" },
          //    { id: "celso", img: "celso.jpg" },
          //    { id: "maria", img: "maria.jpg" }
          //    { id: "renata", img: "renata.jpg" }
          //    { id: "cleber", img: "cleber.jpg" },
          //    { id: "marcos", img: "marcos.jpg" },
      //     // { id: "cleide", img: "cleide.jpg" },
      //     // { id: "magna", img: "magna.jpg" },
      //        { id: "glacia", img: "glacia.jpg" },
      //     // { id: "olaf", img: "olaf.jpg" },
      //     // { id: "olga", img: "olga.jpg" }
      //        { id: "tomoeh", img: "sombraDaMorte.jpeg" },
      //     // { id: "roxo", img: "capaceteroxo.png" }
      //        { id: "magnolia", img: "magnolia.jpg" },
      //   ]
      // },
      {
        nome: "CRIADORES",
        classe: "criadores",
        personagens: [
          { id: "criadora", img: "criadora.gif" },
          { id: "cleopatra", img: "cleopatra.png" },
          { id: "agatha", img: "agatha.png" },
        ]
      }
    ];
  }

  let faccaoAtual = 0;
  const grupos = [];

  faccoes.forEach((f, i) => {
    const grupo = document.createElement("div");
    grupo.className = "grupoFaccao" + (i === 0 ? " ativo" : "");

    const classe = document.createElement("div");
    classe.className = `classePersonagem ${f.classe}`;

    f.personagens.forEach(p => {
      const div = document.createElement("div");
      div.className = "personagens";

      const img = document.createElement("img");
      img.src = `./../img/jogo/pilotos/${p.img}`;
      img.id = p.id;

      div.appendChild(img);
      classe.appendChild(div);
    });

    const titulo = document.createElement("h1");
    titulo.textContent = f.nome;

    const linha = document.createElement("div");
    linha.classList.add("linha-faccao");

    linha.appendChild(classe);
    linha.appendChild(titulo);

    grupo.appendChild(linha);
    containerGrupos.appendChild(grupo);
    grupos.push(grupo);
  });

  function trocarFaccao(dir) {
    grupos[faccaoAtual].classList.remove("ativo");

    faccaoAtual = (faccaoAtual + dir + grupos.length) % grupos.length;

    const grupoAtual = grupos[faccaoAtual];
    grupoAtual.classList.add("ativo");

    // 🔥 RESET SEMPRE PARA O PRIMEIRO DO BLOCO
    const primeiroImg = grupoAtual.querySelector("img");
    if (primeiroImg) {
      selecionarPersonagem(primeiroImg.id);
    }
  }

  setaCima.onclick = () => trocarFaccao(-1);
  setaBaixo.onclick = () => trocarFaccao(1);

  configurarSelecaoPersonagem();

  // 🔥 seleção inicial baseada na primeira facção
  const primeiroImg = grupos[0].querySelector("img");
  if (primeiroImg) {
    selecionarPersonagem(primeiroImg.id);
  }
});
