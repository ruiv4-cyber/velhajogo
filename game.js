let currentPlayer = "X"; // Jogador 1 começa
let playerScores = { X: 0, O: 0 }; // Placar de vitórias
let roundWins = { X: 0, O: 0 }; // Contagem de vitórias por rodada

const cells = document.querySelectorAll(".cell");
const scoreDisplay = document.getElementById("score");
const turnIndicator = document.getElementById("turnIndicator");
const overlay = document.querySelector(".overlay");
const winnerText = document.querySelector(".winner-text");
const restartButton = document.getElementById("restartButton");
const replayButton = document.getElementById("replayButton"); // Botão "Jogar Novamente"

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

// Função para exibir o vencedor
function showWinner(winner) {
  winnerText.textContent = `O vencedor da rodada é: Jogador ${winner === 'X' ? '1' : '2'}`;
  roundWins[winner]++;
  
  // Verifica se algum jogador venceu 3 rodadas
  if (roundWins[winner] === 3) {
    winnerText.textContent = `O Jogo terminou! Jogador ${winner === 'X' ? '1' : '2'} venceu o jogo!`;
    replayButton.style.display = "block"; // Exibe o botão "Jogar Novamente"
    restartButton.style.display = "block"; // Exibe o botão "Voltar ao Menu"
  } else {
    // Caso contrário, mostra o botão "Jogar Novamente" apenas na rodada
    replayButton.style.display = "block";
  }

  playerScores[winner]++;
  updateScore();
  overlay.style.display = "flex"; // Exibe o overlay
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
    replayButton.style.display = "block"; // Exibe o botão "Jogar Novamente"
    return true;
  }
  return false;
}

// Função para fazer um movimento (Jogador 1 ou Jogador 2)
function makeMove(cell) {
  if (!cell.textContent) {
    cell.textContent = currentPlayer;
    if (checkWinner()) return; // Se houver vencedor, interrompe
    if (checkDraw()) return; // Se houver empate, interrompe
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Troca de jogador
    turnIndicator.textContent = `É a vez do Jogador ${currentPlayer === 'X' ? '1 (X)' : '2 (O)'}`; // Atualiza turno
  }
}

// Função para reiniciar o jogo
function resetGame() {
  cells.forEach(cell => cell.textContent = ""); // Limpa as células
  overlay.style.display = "none"; // Esconde o overlay
  replayButton.style.display = "none"; // Esconde o botão "Jogar Novamente"
  restartButton.style.display = "none"; // Esconde o botão "Voltar ao Menu"
  winnerText.textContent = "";
  currentPlayer = "X"; // Reseta o jogador para X
  roundWins = { X: 0, O: 0 }; // Reseta as vitórias por rodada
  updateScore();
  turnIndicator.textContent = "É a vez do Jogador 1 (X)"; // Atualiza o indicador de turno
}

// Função para jogar novamente
function replayGame() {
  cells.forEach(cell => cell.textContent = ""); // Limpa as células
  overlay.style.display = "none"; // Esconde o overlay
  replayButton.style.display = "none"; // Esconde o botão "Jogar Novamente"
  restartButton.style.display = "none"; // Esconde o botão "Voltar ao Menu"
  currentPlayer = "X"; // Reseta o jogador para X
  turnIndicator.textContent = "É a vez do Jogador 1 (X)"; // Atualiza o indicador de turno
}

// Atribuindo evento de clique para cada célula
cells.forEach(cell => {
  cell.addEventListener("click", () => makeMove(cell));
});

// Função para gerar partículas caindo em loop
function generateParticles() {
  const particleCount = 25;  // Número de partículas por vez
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

// Função para criar partículas em intervalos
function startParticleLoop() {
  setInterval(generateParticles, 200); // Gerar partículas a cada 200ms
}

// Iniciar a geração contínua de partículas quando a página carregar
window.onload = function() {
  startParticleLoop();
}
// Função para voltar ao menu
function goToMenu() {
  window.location.href = "menu.html"; // Redireciona para o menu
}
