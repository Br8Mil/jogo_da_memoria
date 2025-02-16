const emojis = [
  "🐱", "🐱", "🦝", "🦝", "🦊", "🦊", "🐶", "🐶",
  "🐵", "🐵", "🦁", "🦁", "🐯", "🐯", "🐮", "🐮"
];

let openCards = [];
const shuffleEmojis = shuffleArray([...emojis]);

// Função de embaralhamento usando Fisher-Yates
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Criação do tabuleiro de jogo
function createGameBoard() {
  const gameBoard = document.querySelector(".game");
  shuffleEmojis.forEach(emoji => {
    const box = createCard(emoji);
    gameBoard.appendChild(box);
  });
}

// Função para criar cada carta do jogo
function createCard(emoji) {
  const box = document.createElement("div");
  box.className = "item";
  box.innerHTML = emoji;
  box.onclick = handleClick;
  return box;
}

// Manipulação de clique nas cartas
function handleClick() {
  if (openCards.length < 2 && !this.classList.contains("boxOpen")) {
    flipCard(this);
    openCards.push(this);
  }

  if (openCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

// Função para virar a carta
function flipCard(card) {
  card.classList.add("boxOpen");
}

// Verificação de correspondência entre cartas
function checkMatch() {
  const [firstCard, secondCard] = openCards;
  if (firstCard.innerHTML === secondCard.innerHTML) {
    matchCards(firstCard, secondCard);
  } else {
    unflipCards(firstCard, secondCard);
  }
  openCards = [];

  // Verifica se o jogo foi concluído
  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    playSound("complete");
    alert("Você venceu!");
  }
}

// Função para marcar cartas como correspondentes
function matchCards(firstCard, secondCard) {
  firstCard.classList.add("boxMatch");
  secondCard.classList.add("boxMatch");
  playSound("match");
}

// Função para virar as cartas de volta
function unflipCards(firstCard, secondCard) {
  firstCard.classList.remove("boxOpen");
  secondCard.classList.remove("boxOpen");
}

// Função para reproduzir sons
function playSound(audioName) {
  const audio = new Audio(`./src/sounds/${audioName}.mp3`);
  audio.play();
}

createGameBoard();