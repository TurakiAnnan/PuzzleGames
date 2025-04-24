const wordContainer = 
    document.querySelector(".word-container");
const virtualKeyboard = 
    document.querySelector(".keyboard");
const hangmanImage = 
    document.querySelector(".hangman-box img");
const guessCounter = 
    document.querySelector(".guess-counter b");
const gameModal = 
    document.querySelector(".game-modal");
const playAgainButton = 
    document.querySelector(".play-again");


// Array of possible words and their hints for the game
const gameWords = [
  {
    word: "monkey",
    hint: "A playful animal often found in forests",
  },
  {
    word: "pirate",
    hint: "A sea adventurer who searches for treasure.",
  },
  {
    word: "tennis",
    hint: "A sport played with rackets and a small ball over a net.",
  },
  {
    word: "dinosaur",
    hint: "An ancient reptile that lived millions of years ago.",
  },
  {
    word: "ghost",
    hint: "A spirit or soul of a person who has passed away.",
  },
  {
    word: "alcohol",
    hint: "A beverage that can be consumed in moderation, often associated with parties.",
  },
  {
    word: "pretzel",
	hint: "A salty snack.",
  },
  {
    word: "crocodile",
    hint: "A large reptile often found in rivers.",
  },
  {
    word: "assassin",
    hint: "A person hired to kill someone, often secretly.",
  },
  {
    word: "peugeot",
    hint: "A French car brand known for its stylish vehicles.",
  },
];

// Game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;


// Function to reset the game to its initial state
const resetGame = () => {
  //Resetting all game variables and UI elements
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `images/start.png`;
  guessCounter.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  virtualKeyboard
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  wordContainer.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModal.classList.remove("show");
};

// Function to get a random word and hint from the array
const getRandomWord = () => {
  const { word, hint } =
    gameWords[Math.floor(Math.random() 
    * gameWords.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b")
  .innerText = hint;
  resetGame();
};

// Function to end the game 
const gameOver = (isVictory) => {
    const modalText = isVictory
      ? ` You win! You found the word:`
      : `You Lose! The correct word was:`;
    gameModal.querySelector("p").innerHTML =`${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
};

// Function to initialize the game after each guess
const initializeGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordContainer.querySelectorAll("li")[index]
        .innerText = letter;
        wordContainer.querySelectorAll("li")[index]
        .classList.add("guessed");
      }
    });
  } else {
// If the letter is wrong, increment the wrong guess count and update the hangman image
    wrongGuessCount++;
    if (wrongGuessCount === 0) {
      hangmanImage.src = 
      `images/start.png`;
    }
    if (wrongGuessCount === 1) {
      hangmanImage.src = 
      `images/1_wrong.png`;
    }
    if (wrongGuessCount === 2) {
      hangmanImage.src = 
      `images/2_wrong.png`;
    }
    if (wrongGuessCount === 3) {
      hangmanImage.src = 
      `images/3_wrong.png`;
    }
    if (wrongGuessCount == 4) {
      hangmanImage.src = 
      `images/4_wrong.png`;
    }
    if (wrongGuessCount === 5) {
      hangmanImage.src = 
      `images/5_wrong.png`;
    }
    if (wrongGuessCount === 6) {
      hangmanImage.src =
      `images/6_wrong.png`;
    }
  }

// Disable the clicked button and update the wrong guesses text
  button.disabled = true;
  guessCounter.innerText = `${wrongGuessCount} / ${maxGuesses}`;

// Check for game over conditions
  if (wrongGuessCount === maxGuesses) 
  return gameOver(false);
  if (correctLetters.length === currentWord.length)
  return gameOver(true);
};

//Creating keyboard buttons and adding event listerers
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  virtualKeyboard.appendChild(button);
  button.addEventListener("click", (e) =>
    initializeGame(e.target, String.fromCharCode(i))
  );
}

// Start the game by getting a random word
getRandomWord();
playAgainButton.addEventListener("click", getRandomWord);

