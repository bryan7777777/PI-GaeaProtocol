document.getElementById('iniciar').addEventListener('click', () => {
  document.getElementById('mapContainer').style.top = '0';
  gerarMapa();
});

function gerarMapa() {
  const map = document.getElementById('map');
  map.innerHTML = '';

  for (let i = 0; i < 10; i++) {
    const node = document.createElement('div');
    node.className = 'sala';
    node.dataset.tipo = escolherTipoSala(); // batalha, loja, etc.
    node.style.top = `${i * 200}px`;
    node.style.left = `${Math.random() * 80 + 10}%`;
    node.innerText = node.dataset.tipo.toUpperCase();
    node.addEventListener('click', () => {
      alert(`Você entrou em uma sala de ${node.dataset.tipo}`);
    });
    map.appendChild(node);
  }
}

function escolherTipoSala() {
  const tipos = ['batalha', 'loja', 'inimigo forte', 'boss'];
  return tipos[Math.floor(Math.random() * tipos.length)];
}






// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");

// const imgJogador = new Image();
// imgJogador.src = "../img/player/Robô Mecha Pixelizado (1).png";

// const imgInimigo = new Image();
// imgInimigo.src = "../img/inimigos/tartarugaFraca.png";

// let estado = "inicio";
// let jogador = { hp: 30, maxHp: 30, energia: 3, escudo: 0 };
// let inimigo = null;
// let mao = [];
// let deck = [];

// function iniciarJogo() {
//     document.getElementById("inicio").style.display = "none";
//     canvas.style.display = "block";
//     estado = "mapa";
//     desenharMapa();
// }

// function reiniciarJogo() {
//     jogador = { hp: 30, maxHp: 30, energia: 3, escudo: 0 };
//     document.getElementById("gameover").style.display = "none";
//     canvas.style.display = "block";
//     estado = "mapa";
//     desenharMapa();
// }

// // ctx.drawImage(imgJogador (COLOCA NA TELA O ITEM/IMG DENTRO DA TAG), 370(EIXO X), 500(EIXO Y), 60(LARGURA/X DA IMG EM PX), 80(ALTURA/Y DA IMG EM PX));
// function desenharMapa() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(imgJogador, 370, 500, 60, 80);
//     ctx.drawImage(imgInimigo, 170, 120, 60, 80);
//     ctx.drawImage(imgInimigo, 570, 120, 60, 80);
//     ctx.fillStyle = "black";
//     ctx.font = "20px Arial";
//     ctx.fillText("1: Batalha", 170, 100);
//     ctx.fillText("2: Evento", 570, 100);
// }

// canvas.addEventListener("click", (e) => {
//     if (estado === "mapa") {
//         const x = e.offsetX, y = e.offsetY;
//         if (x > 170 && x < 230 && y > 120 && y < 180) {
//             iniciarBatalha();
//         } else if (x > 570 && x < 630 && y > 120 && y < 180) {
//             iniciarEvento();
//         }
//     }
// });

// function iniciarBatalha() {
//     estado = "batalha";
//     jogador.energia = 3;
//     jogador.escudo = 0;
//     inimigo = { hp: 25, acao: "ataque", dano: 6 };
//     gerarDeck();
//     comprarCartas(3);
//     desenharBatalha();
// }

// function gerarDeck() {
//     deck = [
//         { nome: "Ataque", tipo: "ataque", custo: 1, valor: 6 },
//         { nome: "Ataque", tipo: "ataque", custo: 1, valor: 6 },
//         { nome: "Defesa", tipo: "defesa", custo: 1, valor: 5 },
//         { nome: "Golpe Forte", tipo: "ataque", custo: 2, valor: 12 },
//         { nome: "Barreira", tipo: "defesa", custo: 1, valor: 8 }
//     ];
// }

// function comprarCartas(n) {
//     mao = [];
//     for (let i = 0; i < n; i++) {
//         let idx = Math.floor(Math.random() * deck.length);
//         mao.push(deck[idx]);
//     }
// }

// function desenharBatalha() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(imgJogador, 100, 400, 60, 60);
//     ctx.drawImage(imgInimigo, 570, 70, 60, 60);

//     ctx.fillStyle = "black";
//     ctx.fillText(`HP: ${jogador.hp}`, 50, 50);
//     ctx.fillText(`Escudo: ${jogador.escudo}`, 50, 70);
//     ctx.fillText(`Energia: ${jogador.energia}`, 50, 90);

//     ctx.fillText(`Inimigo HP: ${inimigo.hp}`, 550, 50);
//     ctx.fillText(`Inimigo vai usar: ${inimigo.acao} (${inimigo.dano})`, 500, 70);

//     // Cartas na mão
//     mao.forEach((carta, i) => {
//         const x = 100 + i * 150;
//         ctx.fillStyle = "#fff";
//         ctx.fillRect(x, 500, 120, 60);
//         ctx.strokeRect(x, 500, 120, 60);
//         ctx.fillStyle = "black";
//         ctx.fillText(`${carta.nome} (${carta.custo})`, x + 10, 530);
//     });

//     canvas.onclick = (e) => {
//         if (estado !== "batalha") return;
//         const x = e.offsetX, y = e.offsetY;
//         if (y > 500 && y < 560) {
//             mao.forEach((carta, i) => {
//                 const cx = 100 + i * 150;
//                 if (x > cx && x < cx + 120 && jogador.energia >= carta.custo) {
//                     jogarCarta(carta);
//                     mao.splice(i, 1);
//                     desenharBatalha();
//                 }
//             });
//         }
//     };
// }

// function jogarCarta(carta) {
//     jogador.energia -= carta.custo;
//     if (carta.tipo === "ataque") {
//         inimigo.hp -= carta.valor;
//     } else if (carta.tipo === "defesa") {
//         jogador.escudo += carta.valor;
//     }
//     verificarEstadoBatalha();
// }

// function turnoInimigo() {
//     let danoRecebido = Math.max(inimigo.dano - jogador.escudo, 0);
//     jogador.escudo = 0;
//     jogador.hp -= danoRecebido;

//     // Recalcula nova ação do inimigo
//     inimigo.acao = Math.random() > 0.5 ? "ataque" : "buff";
//     inimigo.dano = inimigo.acao === "ataque" ? 6 + Math.floor(Math.random() * 4) : 0;
//     if (inimigo.acao === "buff") {
//         inimigo.hp += 4;
//     }

//     jogador.energia = 3;
//     comprarCartas(3);
//     verificarEstadoBatalha();
// }

// function verificarEstadoBatalha() {
//     if (jogador.hp <= 0) {
//         gameOver();
//     } else if (inimigo.hp <= 0) {
//         estado = "mapa";
//         desenharMapa();
//     } else {
//         setTimeout(turnoInimigo, 1000);
//     }
// }

// // EVENTOS
// const eventos = [
//     {
//         nome: "Poço misterioso",
//         texto: "Você encontra um poço que brilha azul.",
//         opcoes: [
//             { texto: "Beber (cura 10 HP)", acao: () => jogador.hp = Math.min(jogador.hp + 10, jogador.maxHp) },
//             { texto: "Ignorar", acao: () => {} }
//         ]
//     },
//     {
//         nome: "Estátua antiga",
//         texto: "Uma estátua antiga oferece poder em troca de sangue.",
//         opcoes: [
//             { texto: "Aceitar (-5 HP, +1 MaxHP)", acao: () => { jogador.hp -= 5; jogador.maxHp += 1; } },
//             { texto: "Rejeitar", acao: () => {} }
//         ]
//     }
// ];

// function iniciarEvento() {
//     estado = "evento";
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     const evento = eventos[Math.floor(Math.random() * eventos.length)];
//     ctx.fillStyle = "black";
//     ctx.font = "18px Arial";
//     ctx.fillText(`Evento: ${evento.nome}`, 50, 50);
//     ctx.fillText(evento.texto, 50, 80);
//     evento.opcoes.forEach((op, i) => {
//         ctx.fillStyle = "#ddd";
//         ctx.fillRect(100, 150 + i * 80, 600, 50);
//         ctx.strokeRect(100, 150 + i * 80, 600, 50);
//         ctx.fillStyle = "black";
//         ctx.fillText(op.texto, 120, 180 + i * 80);
//     });

//     canvas.onclick = (e) => {
//         const x = e.offsetX, y = e.offsetY;
//         evento.opcoes.forEach((op, i) => {
//             if (x > 100 && x < 700 && y > 150 + i * 80 && y < 200 + i * 80) {
//                 op.acao();
//                 estado = "mapa";
//                 desenharMapa();
//             }
//         });
//     };
// }

// function gameOver() {
//     estado = "gameover";
//     canvas.style.display = "none";
//     document.getElementById("gameover").style.display = "block";
// }