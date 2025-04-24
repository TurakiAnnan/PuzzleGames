// This script will be used to handle the logic for checking answers on each riddle page.

let correctAnswer = ""; // To store the correct answer for each riddle

// This function sets the correct answer for the current riddle
function setCorrectAnswer(answer) {
  correctAnswer = answer;
}

// This function checks the user's answer
function checkAnswer() {
  const userAnswer = document.getElementById("answer-input").value.toLowerCase().trim();
  const feedback = document.getElementById('feedback');
  const emoji = document.getElementById('emoji');

  if (userAnswer === correctAnswer) {
    feedback.textContent = "Correct! Well done!";
    emoji.textContent = "😊"; // Smiley face for correct answer
    feedback.classList.remove("incorrect");
    feedback.classList.add("correct");

    // Display the Next button or Finish button, depending on the riddle
    const nextButton = document.getElementById("next-riddle");
    const finishButton = document.getElementById("finish-game");

    if (nextButton) {
      nextButton.style.display = "inline-block"; // Show Next button for riddle 1 and 2
    }
    if (finishButton) {
      finishButton.style.display = "inline-block"; // Show Finish button for the last riddle
    }

    // Disable the input and submit button after answering
    document.getElementById("answer-input").disabled = true;
    document.querySelector("button").disabled = true;
  } else {
    feedback.textContent = "Oops, try again!";
    emoji.textContent = "😞"; // Sad face for incorrect answer
    feedback.classList.remove("correct");
    feedback.classList.add("incorrect");
  }
}

// This function moves the user to the next riddle page
function nextRiddle() {
  if (window.location.pathname.includes("riddle1.html")) {
    window.location.href = 'riddle2.html'; // Go to riddle 2
  } else if (window.location.pathname.includes("riddle2.html")) {
    window.location.href = 'riddle3.html'; // Go to riddle 3
  }
}

// This function finishes the game and redirects to the Thank You page
function finishGame() {
  window.location.href = 'thankyou.html'; // Go to the Thank You page
}

// This function will be called when the page loads to set the correct answer based on the riddle page
window.onload = function () {
  if (window.location.pathname.includes("riddle1.html")) {
    setCorrectAnswer("piano"); // Set the answer for riddle 1
  } else if (window.location.pathname.includes("riddle2.html")) {
    setCorrectAnswer("echo"); // Set the answer for riddle 2
  } else if (window.location.pathname.includes("riddle3.html")) {
    setCorrectAnswer("darkness"); // Set the answer for riddle 3
  }
};
