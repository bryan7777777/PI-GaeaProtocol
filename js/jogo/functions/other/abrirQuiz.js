function abrirQuiz() {
  const quizContainer = document.getElementById("quiz-container");

const perguntas = [
  {
    pergunta: "Qual a capital do Brasil?",
    respostas: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    correta: "Brasília"
  },
  {
    pergunta: "2 + 2 = ?",
    respostas: ["3", "4", "5", "22"],
    correta: "4"
  },
  {
    pergunta: "Qual é o maior planeta?",
    respostas: ["Terra", "Marte", "Júpiter", "Vênus"],
    correta: "Júpiter"
  }
];

// embaralhar array
function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

// tela inicial
function mostrarInicio() {
  quizContainer.innerHTML = `
    <p>Quer fazer um quiz?</p>
    <button class="quiz-btn" onclick="iniciarQuiz()">Sim</button>
    <button class="quiz-btn" onclick="recusarQuiz()">Não</button>
  `;
}

// iniciar quiz
function iniciarQuiz() {
  const perguntaAleatoria = perguntas[Math.floor(Math.random() * perguntas.length)];
  const respostas = embaralhar([...perguntaAleatoria.respostas]);

  quizContainer.innerHTML = `<p>${perguntaAleatoria.pergunta}</p>`;

  respostas.forEach(resposta => {
    const btn = document.createElement("button");
    btn.classList.add("quiz-btn");
    btn.textContent = resposta;

    btn.onclick = () => {
      if (resposta === perguntaAleatoria.correta) {
        acertou();
      } else {
        errou();
      }
    };

    quizContainer.appendChild(btn);
  });
}

// ações
function acertou() {
  alert("Você acertou! 🔥 (Aqui acontece X)");
  mostrarInicio(); // reinicia
}

function errou() {
  alert("Você errou 😢 (Aqui acontece Y)");
  mostrarInicio(); // reinicia
}

// recusar
function recusarQuiz() {
  quizContainer.innerHTML = `<p>Quiz cancelado 😴</p>`;
}

// iniciar
mostrarInicio();
}