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
    winningNum = getRandomNumber(min, max),
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

// Because of event bubbling we add listener to parent (class 'play-again' appeard after loading the page)
// mousedown because it is fired before click (so after winning we have a chance to see information about it, otherwise we will
// have page immediately refreshed, because 'play-again' class is added inside endGame()
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

guessBtn.addEventListener('click', function(){
 let guessedNumber = parseInt(guessInput.value);
 let valid = validateGuess(guessedNumber);
 
 if(valid) {
  if(guessedNumber === winningNum) {
    endGame(true, `${guessedNumber} is correct! You won!`)
  } else {
    guessesLeft -= 1;

    if(guessesLeft === 0) {
      endGame(false, `Game Over. The correct number was: ${winningNum}`);
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

function endGame(won, message) {
  won === true ? colour = 'forestgreen' : colour = 'red';
  guessInput.style.borderColor = colour;
  guessInput.disabled = true;
  setMessage(message, colour);

  guessBtn.value = 'Play again';
  guessBtn.className += 'play-again';
}

function getRandomNumber(min, max){
  var x = Math.floor((Math.random() * (max-min+1) + min));
  console.log(x);
  return x;
}