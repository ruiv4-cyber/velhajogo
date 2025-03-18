let currentPlayer = "X"; // Jogador humano começa
const cells = document.querySelectorAll(".cell");
const overlay = document.querySelector(".overlay");
const winnerText = document.querySelector(".winner-text");
const restartButton = document.getElementById("restartButton");
const replayButton = document.getElementById("replayButton");
const scoreDisplay = document.getElementById("score");
const turnIndicator = document.getElementById("turnIndicator");

let playerScores = { X: 0, O: 0 }; // Jogador (X) e Máquina (O)
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

// Função para exibir o vencedor
function showWinner(winner) {
  winnerText.textContent = `O vencedor da rodada é: Jogador ${winner === 'X' ? '1' : 'Máquina'}`;
  roundWins[winner]++;
  
  // Verifica se algum jogador venceu 3 rodadas
  if (roundWins[winner] === 3) {
    winnerText.textContent = `O Jogo terminou! Jogador ${winner === 'X' ? '1' : 'Máquina'} venceu a partida!`;
    restartButton.style.display = "block"; // Exibe o botão de voltar ao menu
  }
  
  playerScores[winner]++;
  updateScore();
  overlay.style.display = "flex";
  replayButton.style.display = "block"; // Exibe o botão para jogar novamente
}

// Função para atualizar o placar
function updateScore() {
  scoreDisplay.textContent = `Jogador (X): ${playerScores.X} | Máquina (O): ${playerScores.O}`;
}

// Função para verificar se houve empate
function checkDraw() {
  const allFilled = Array.from(cells).every(cell => cell.textContent !== "");
  if (allFilled && !checkWinner()) {
    winnerText.textContent = "Deu velha. Tente novamente.";
    overlay.style.display = "flex";
    replayButton.style.display = "block"; // Exibe o botão para jogar novamente
    return true;
  }
  return false;
}

// Função para fazer um movimento (Jogador ou Máquina)
function makeMove(cell) {
  if (!cell.textContent && currentPlayer === "X") {
    cell.textContent = currentPlayer;
    if (checkWinner()) return;
    if (checkDraw()) return;
    currentPlayer = "O"; // A vez da máquina
    turnIndicator.textContent = `É a vez da Máquina (O)`;
    setTimeout(machineMove, 500); // A máquina joga após meio segundo
  }
}

// Função para a máquina fazer um movimento aleatório
function machineMove() {
  let availableCells = Array.from(cells).filter(cell => !cell.textContent);
  if (availableCells.length === 0) return; // Se não há mais movimentos disponíveis, retorna
  let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
  randomCell.textContent = "O";
  if (checkWinner()) return;
  if (checkDraw()) return;
  currentPlayer = "X";
  turnIndicator.textContent = `É a vez do Jogador (X)`;
}

// Função para reiniciar o jogo
function resetGame() {
  cells.forEach(cell => cell.textContent = "");
  overlay.style.display = "none";
  replayButton.style.display = "none";
  restartButton.style.display = "none";
  winnerText.textContent = "";
  currentPlayer = "X";
  turnIndicator.textContent = "É a vez do Jogador (X)";
  roundWins = { X: 0, O: 0 }; // Reseta as vitórias de rodada
  updateScore();
}

// Função para jogar novamente
function replayGame() {
  cells.forEach(cell => cell.textContent = ""); // Limpa as células
  overlay.style.display = "none"; // Esconde o overlay
  replayButton.style.display = "none"; // Esconde o botão "Jogar Novamente"
  winnerText.textContent = ""; // Limpa a mensagem de vencedor
  currentPlayer = "X"; // Reseta o jogador para X
  turnIndicator.textContent = "É a vez do Jogador (X)"; // Atualiza o indicador de turno
}

// Função para voltar ao menu
function goToMenu() {
  window.location.href = "menu.html"; // Redireciona para o menu
}

// Atribuindo evento de clique para as células
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
