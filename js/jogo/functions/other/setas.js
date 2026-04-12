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
        nome: "GAEA PROTOCOOL",
        classe: "gaea",
        personagens: [
          { id: "verde", img: "capaceteverde.png" },
        ]
      },
    ]
  } else {
    faccoes = [
      {
        nome: "GAEA PROTOCOOL",
        classe: "gaea",
        personagens: [
          { id: "gaeaReen", img: "gaeaReen.gif" },
          { id: "verde", img: "capaceteverde.png" },
          { id: "magnolia", img: "magnolia.jpg" },
          { id: "wallace", img: "espectroDaFloresta.jpeg" },
        ]
      },
      {
        nome: "GLEBA PROTOCOOL",
        classe: "mineiros",
        personagens: [
          { id: "amarelo", img: "bruno.gif" },
          { id: "felipe", img: "felipe.jpg" },
          { id: "celso", img: "celso.jpg" },
          { id: "maria", img: "maria.jpg" }
        ]
      },
      {
        nome: "OCEAN PROTOCOOL",
        classe: "porto",
        personagens: [
          { id: "porto", img: "autoridadeDoPorto.gif" },
          { id: "azul", img: "capaceteazul.png" },
          { id: "fergus", img: "fergus.jpg" },
          { id: "mercuri", img: "mercuri.jpg" }
        ]
      },
      {
        nome: "FAUNA PROTOCOOL",
        classe: "laranjas",
        personagens: [
          { id: "laranja", img: "gabriel.gif" },
          { id: "cleber", img: "cleber.jpg" },
          { id: "malaquias", img: "malaquias.jpg" },
          { id: "renata", img: "renata.jpg" }
        ]
      },
      {
        nome: "WIND PROTOCOOL",
        classe: "eolico",
        personagens: [
          { id: "lucius", img: "lucius.gif" },
          { id: "marcos", img: "marcos.jpg" },
          { id: "cleide", img: "cleide.jpg" },
          { id: "magna", img: "magna.jpg" },
        ]
      },
      {
        nome: "GLACIAL PROTOCOOL",
        classe: "glacial",
        personagens: [
          { id: "lilia", img: "lilia.gif" },
          { id: "glacia", img: "glacia.jpg" },
          { id: "olaf", img: "olaf.jpg" },
          { id: "olga", img: "olga.jpg" }
        ]
      },
      {
        nome: "SOLITÁRIOS",
        classe: "semFaccao",
        personagens: [
          { id: "ferrus", img: "magnusFerrus.gif" },
          { id: "x", img: "gemea.jpeg" },
          { id: "tomoeh", img: "sombraDaMorte.jpeg" },
          { id: "roxo", img: "capaceteroxo.png" }
        ]
      },
      {
        nome: "CRIADORES",
        classe: "criadores",
        personagens: [
          { id: "criadora", img: "criadora.gif" },
          { id: "cleopatra", img: "cleopatra.png" },
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
