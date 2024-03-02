const words = ["javascript", "hangman", "developer", "programming", "openai", "challenge"];

let selectedWord = "";
let guessedWord = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6; 

function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  //console.log(selectedWord);
  guessedWord = Array(selectedWord.length).fill('_');

  incorrectGuesses = 0;


  displayGameStatus();
  element=document.getElementById("hang")
  element.innerHTML="<img src=\"./assets/hang.svg\" class=\"stand\" />"
  document.addEventListener('keydown', handleKeyPress);
  document.addEventListener('click', handleLetterClick);

}



function displayGameStatus() {

  const answer=document.getElementById("answer-section")
  answer.innerHTML=`<div> 
                    <p> Hangman: ${'X'.repeat(incorrectGuesses)}${'-'.repeat(maxIncorrectGuesses - incorrectGuesses)}</p>
                    <p>Word: ${guessedWord.join(' ')}</p>
                    <p>Incorrect Guesses: ${incorrectGuesses}</p>

                    </div>`
    if (guessedWord.join('') === selectedWord) {
    alert('Congratulations! You won!');
    startGame(); 
  } else if (incorrectGuesses === 1) {
    head()
  }
    else if (incorrectGuesses === 2) {
    body()
  }
    else if (incorrectGuesses === 3) {
    leftHand()  }
    else if (incorrectGuesses === 4) {
    rightHand()  }
    else if (incorrectGuesses === 5) {
        leftLeg()  }
    else if (incorrectGuesses === maxIncorrectGuesses) {
            rightLeg() 
            alert("Sorry! You lost. The correct word was " + selectedWord);
            startGame()


}
}


function handleKeyPress(event) {
  if (/^[a-zA-Z]$/.test(event.key)) {
    const guessedLetter = event.key.toLowerCase();

    if (selectedWord.includes(guessedLetter)) {
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
          guessedWord[i] = guessedLetter;
        }
      }
    } else {
      incorrectGuesses++;
    }

    displayGameStatus();
  }
}
function handleLetterClick(clickedLetter) {
    //console.log(clickedLetter)
    clickedLetter=clickedLetter.target.innerHTML.toLowerCase()
    if (!selectedWord.includes(clickedLetter)) {
      // Incorrect guess
      incorrectGuesses++;
      if (incorrectGuesses === maxIncorrectGuesses) {
        rightLeg()
        alert("Sorry! You lost. The correct word was " + selectedWord);
        startGame(); // Start a new game
      } else {
        // Display the appropriate hangman part for each incorrect guess
        switch (incorrectGuesses) {
          case 1:
            head();
            break;
          case 2:
            body();
            break;
          case 3:
            leftHand();
            break;
          case 4:
            rightHand();
            break;
          case 5:
            leftLeg();
            break;
          case 6:
            rightLeg();
            break;
        }
      }
    } else {
      // Correct guess
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === clickedLetter) {
          guessedWord[i] = clickedLetter;
        }
      }
  
      // Check if the game is won
      if (guessedWord.join('') === selectedWord) {
        alert('Congratulations! You won!');
        startGame(); // Start a new game
      }
    }
  
    // Display the updated game status
    displayGameStatus();
  }




startGame();
