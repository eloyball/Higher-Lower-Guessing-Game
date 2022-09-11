// Returns the current value the user has 
// entered into the guess input box.
function getGuessInput() {
  // This will get the value of an input element with the id "guess-input".
  let guessString = document.getElementById("guess-input").value;

  // Converts the string to a number.
  let guessNumber = Number(guessString);

  // Returns the number. 
  return guessNumber;
}

// Sets the current value  entered into the 
// guess input box to 'value'.
function setGuessInput(value) {
  document.getElementById("guess-input").value = value;
}

// Hides all messages shown to the user within
// the "message-container" element.
function hideAllMessages() {
  // Find all message elements.
  let messages = document.querySelectorAll("#message-container > *");

  // Add the "hidden" class to each of the message elements.
  for (let i = 0; i < messages.length; i++) {
    messages[i].classList.add("hidden");
  }
}

// Hides all messages and then shows the one
// with with the id attribute matching 'id' 
// parameter.
function showMessage(id) {

  // Hide all the messages.
  hideAllMessages();

  // Find the message with 'id'.
  let message = document.getElementById(id);
  if (message != null) {
    // Show the message.
    message.classList.remove("hidden");
  } else {
    console.log(`${id} does not exist.`);
  }
}

// Shows the remaining guess count.
function showRemainingGuesses(value) {
  document.getElementById("remining-guesses").innerHTML = value;
}

// Initialize global variables.
let magicNumber = -1;
let remainingGuesses = -1;
let userInput = -1;


// Returns a random integer in the range 'min' through 'max' inclusive.
function getRandomIntInclusive(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNum;
}

// Function sets up a new game.
function setupNewGame() {
  magicNumber = getRandomIntInclusive(1, 100);
  remainingGuesses = 5;
  showRemainingGuesses(remainingGuesses);
  hideAllMessages();
}

// Handles when the user makes a new guess.
function handleGuess() {
  // Check if remaining guesses is -1 and setup a new game if so.
  if (remainingGuesses == -1) {
    setupNewGame();
  }

  // Check if the user has any remaining guesses and return if not.
  if (remainingGuesses == 0) {
    return;
  }

  // Retreive the user's newest guess.
  userInput = getGuessInput();

  // Check if the user has won. We should show a message, set remaining guesses to 0, and return from this function.
  if (userInput == magicNumber) {
    showMessage("win-message");
    remainingGuesses = 0;
    return;
  }

  // Check if the guess is higher or lower and show appropriate message.
  if (userInput < magicNumber) {
    showMessage("higher-message");
  }

  if (userInput > magicNumber) {
    showMessage("lower-message");
  }

  // The user has used a guess, decrement remainin guesses and show the new value.
  remainingGuesses--;
  showRemainingGuesses(remainingGuesses);

  // If the remaining guesses is 0, then the user has lost and that message should be shown.
  if (remainingGuesses == 0) {
    showMessage("lose-message");
  }
}

// Allow the user to play again.
function handlePlayAgain() {
  setupNewGame();
  userInput = -1;
  setGuessInput("");
}