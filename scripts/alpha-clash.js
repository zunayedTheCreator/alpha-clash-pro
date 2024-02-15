// function play() {
//     // step-1: hide the home screen. to hide the screen add the class hidden to the home screen
//     const homeSection = document.getElementById('home');
//     homeSection.classList.add('hidden')
//     // console.log(homeSection.classList);

//     // show the playground
//     const playgroundSection = document.getElementById('playground');
//     playgroundSection.classList.remove('hidden');
//     // console.log(playgroundSection.classList);
// }

function handleKeyboardKeyUpEvent(event) {
    const playerPressed = event.key;
    console.log('player pressed',playerPressed);

    // stop the game if press 'esc'
    if (playerPressed == 'Escape') {
        gameOver();
    }

    // get the expected to press
    const currentAlphabetElement = document.getElementById('current-alphabet');
    const currentAlphabet = currentAlphabetElement.innerText;
    const expectedAlphabet = currentAlphabet.toLowerCase();

    // check matched or not
    if (playerPressed === expectedAlphabet) {
        console.log('you got a point');

        // update score
        // 1. get the current score
        const currentScoreElement = document.getElementById('current-score');
        const currentScoreText = currentScoreElement.innerText;
        const currentScore = parseFloat(currentScoreText);

        // 2. increase the score by 1
        const newScore = currentScore + 1;

        // 3. show the updated score
        currentScoreElement.innerText = newScore;

        // start a new round
        removeBgColorById(expectedAlphabet);
        continueGame();
    }
    else {
        console.log('you missed. you lost a life.');
        // step-1: get the current life number
        const currentLifeElement = document.getElementById('current-life');
        const currentLifeText = currentLifeElement.innerText;
        const currentLife = parseFloat(currentLifeText);

        // step-2: reduce the life count
        const newLife = currentLife - 1;

        // step-3: display the updated life count
        currentLifeElement.innerText = newLife;

        if (newLife < 0) {
            gameOver();
        }
    }
}
// capture keyboard key press
document.addEventListener('keyup', handleKeyboardKeyUpEvent)

function continueGame() {
    // step-1: generate a random alphabet
    const alphabet = getARandomAlphabet();
    // console.log('your random alphabet', alphabet);

    // set random alphabet to the string
    const currentAlphabetElement = document.getElementById('current-alphabet');
    currentAlphabetElement.innerText = alphabet;

    // set background color
    setBgColorById(alphabet);
}

function play() {
    // hide everything show only the playground
    hideElementById('home')
    showElementById('playground')
    hideElementById('score')

    // reset score and life
    setTextElementValueById('current-life', 5);
    setTextElementValueById('current-score', 0);


    continueGame();
}

function gameOver() {
    hideElementById('playground');
    showElementById('score')

    // update finale score
    // 1. get the finale score
    const finaleScore = getTextValueById('current-score')
    setTextElementValueById('final-score', finaleScore)

    // clear the last selected alphabet highlight
    const currentAlphabet = getElementTextById('current-alphabet');
    // console.log(currentAlphabet);
    removeBgColorById(currentAlphabet);
}