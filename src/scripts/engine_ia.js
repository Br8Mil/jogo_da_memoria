const emojis = [
    "🐱", "🐱", "🦝", "🦝", "🦊", "🦊", "🐶", "🐶",
    "🐵", "🐵", "🦁", "🦁", "🐯", "🐯", "🐮", "🐮"
  ];
  let openCards = [];
  
  const shuffleEmojis = shuffleArray([...emojis]);
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function createGameBoard() {
    const gameBoard = document.querySelector(".game");
    shuffleEmojis.forEach(emoji => {
      const box = document.createElement("div");
      box.className = "item";
      box.innerHTML = emoji;
      box.onclick = handleClick;
      gameBoard.appendChild(box);
    });
  }
  
  function handleClick() {
    if (openCards.length < 2 && !this.classList.contains("boxOpen")) {
      this.classList.add("boxOpen");
      openCards.push(this);
    }
  
    if (openCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
  
  function checkMatch() {
    const [firstCard, secondCard] = openCards;
    if (firstCard.innerHTML === secondCard.innerHTML) {
      firstCard.classList.add("boxMatch");
      secondCard.classList.add("boxMatch");
    } else {
      firstCard.classList.remove("boxOpen");
      secondCard.classList.remove("boxOpen");
    }
    openCards = [];
  
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
      playSound("complete");
      alert("Você venceu!");
    }
  }
  
  function playSound(audioName) {
    const audio = new Audio(`./src/sounds/${audioName}.mp3`);
    audio.play();
  }
  
  createGameBoard();  