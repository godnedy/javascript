/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 3,
    max = 10,
    winningNum = 5,
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener('click', function(){
 let guessedNumber = parseInt(guessInput.value);
 let valid = validateGuess(guessedNumber);
 
 if(valid) {
  if(guessedNumber === winningNum) {
    guessInput.style.borderColor = 'forestgreen';
    guessInput.disabled = true; 
    setMessage(`${guessedNumber} is correct! You won!`, 'forestgreen');
  } else {
    guessesLeft -= 1;

    if(guessesLeft === 0) {
      guessInput.style.borderColor = 'violet';
      guessInput.disabled = true; 
      setMessage(`Game Over. The correct number was: ${winningNum}`, 'red');
    } else {
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`You haven't guessed :( You have ${guessesLeft} guesses left`, 'red');
    }
  }
 }

})

function validateGuess(guess){
  if(isNaN(guess) || guess > max || guess < min) {
    setMessage(`Invalid value entered. Please enter a number between ${ min } and ${ max }`, 'red');
    return false;
  }
  return true;
}

function setMessage(msg, colour){
  message.textContent = msg;
  message.style.color = colour;
}