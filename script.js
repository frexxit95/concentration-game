let cards = [];
let cardValues = ['😊', '🌟', '🦷', '🤖', '📛', '🍵', '🌞', '❤️'];
let moves = 0;
let matchesFound = 0;
let cardFlipped = false;
let firstCard, secondCard;
let lockBoard = false;

function startGame() {
    cards = [];
    moves = 0;
    matchesFound = 0;
    cardFlipped = false;
    firstCard = secondCard = null;
    lockBoard = false;
    document.getElementById('score').innerText = `Moves: ${moves}`;
    initializeCards();
    shuffleCards();
    renderCards();
}

function initializeCards() {
    cards = cardValues.concat(cardValues); // Duplicate the array
}

function shuffleCards() {
    cards = cards.sort(() => 0.5 - Math.random());
}

function renderCards() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cards.forEach((value, index) => {
        const cardElement = document.createElement('div');
        
        cardElement.classList.add('card');
        cardElement.setAttribute('data-card-value', value);

        
        cardElement.addEventListener('click', () => onCardClicked(cardElement));
        gameBoard.appendChild(cardElement);
    });
}

function onCardClicked(cardElement) {
    if (lockBoard) return;
    if (cardElement === firstCard) return;

    cardElement.classList.remove('flip'); // Remove flip class to reset the rotation
    cardElement.classList.remove('flip-animation');

    // Trigger reflow to restart the animation
    void cardElement.offsetWidth;

    cardElement.classList.add('flip-animation');
    setTimeout(() => {
        cardElement.classList.add('flip');
        cardElement.innerHTML = cardElement.getAttribute('data-card-value');
    }, 300); // Adjust the timeout value as needed

    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    checkForMatch();
}




function checkForMatch() {
    let isMatch = firstCard.getAttribute('data-card-value') === secondCard.getAttribute('data-card-value');

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    // Set a timeout to give the user time to see the match before the cards disappear
    setTimeout(() => {
        // Remove the cards from the board
        firstCard.style.visibility = 'hidden';
        secondCard.style.visibility = 'hidden';

        resetBoard();
        matchesFound++;
        moves++;
        updateScore();

        // Check if the game has been won
        if (matchesFound === cardValues.length) {
            setTimeout(() => alert("Congratulations! You've won!"), 500);
        }
    }, 1000);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        firstCard.innerHTML = ''; // Clear innerHTML instead of innerText
        secondCard.classList.remove('flip');
        secondCard.innerHTML = ''; // Clear innerHTML instead of innerText
        resetBoard();
    }, 1500);

    moves++;
    updateScore();
}

function resetBoard() {
    [cardFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function updateScore() {
    document.getElementById('score').innerText = `Moves: ${moves}`;
}

startGame();
