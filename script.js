let currentPlayer = "X"; // ou 'O'
const cells = document.querySelectorAll(".cell");
const overlay = document.querySelector(".overlay");
const winnerText = document.querySelector(".winner-text");
const restartButton = document.getElementById("restartButton");
const scoreDisplay = document.getElementById("score");
const turnIndicator = document.getElementById("turnIndicator");

let playerScores = { X: 0, O: 0 };
let roundWins = { X: 0, O: 0 }; // Contagem de vitórias por rodada

// Função para verificar se há um vencedor
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      showWinner(cells[a].textContent); 
      return true;
    }
  }
  return false;
}

// Função para exibir o vencedor e animar
function showWinner(winner) {
  winnerText.textContent = `O vencedor da rodada é: Jogador ${winner === 'X' ? '1' : '2'}`;
  roundWins[winner]++;
  
  // Verifica se algum jogador venceu 3 rodadas
  if (roundWins[winner] === 3) {
    winnerText.textContent = `O Jogo terminou! Jogador ${winner === 'X' ? '1' : '2'} venceu a partida!`;
    // Desativa o jogo ao final
    restartButton.style.display = "block";
  }
  
  playerScores[winner]++;
  updateScore();
  overlay.style.display = "flex"; // Exibe a sobreposição
  restartButton.style.display = "block"; // Exibe o botão de reinício
  
  generateParticles(); // Gera as partículas ao anunciar o vencedor
}

// Função para atualizar o placar
function updateScore() {
  scoreDisplay.textContent = `Jogador 1 (X): ${playerScores.X} | Jogador 2 (O): ${playerScores.O}`;
}

// Função para verificar se houve empate
function checkDraw() {
  const allFilled = Array.from(cells).every(cell => cell.textContent !== "");
  if (allFilled && !checkWinner()) {
    winnerText.textContent = "Deu velha. Tente novamente.";
    overlay.style.display = "flex";
    restartButton.style.display = "block";
    return true;
  }
  return false;
}

// Função para fazer um movimento
function makeMove(cell) {
  if (!cell.textContent) {
    cell.textContent = currentPlayer;
    if (checkWinner()) return;
    if (checkDraw()) return;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnIndicator.textContent = `É a vez do Jogador ${currentPlayer === "X" ? "1" : "2"} (${currentPlayer})`;
  }
}

// Função para gerar partículas caindo
function generateParticles() {
  const particleCount = 50;  // Número de partículas
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * window.innerWidth + 'px'; // Posição horizontal aleatória
    particle.style.animationDuration = Math.random() * 2 + 3 + 's'; // Duração de queda aleatória
    document.body.appendChild(particle);

    // Após a animação, a partícula é removida da tela
    setTimeout(() => {
      particle.remove();
    }, 4000); // Remover após 4 segundos
  }
}

// Função para reiniciar o jogo
function resetGame() {
  cells.forEach(cell => cell.textContent = "");
  overlay.style.display = "none";
  restartButton.style.display = "none";
  winnerText.textContent = "";
  currentPlayer = "X";
  turnIndicator.textContent = "É a vez do Jogador 1 (X)";
  roundWins = { X: 0, O: 0 }; // Reseta as vitórias de rodada
}

// Atribuindo evento de clique para as células
cells.forEach(cell => {
  cell.addEventListener("click", () => makeMove(cell));
});
