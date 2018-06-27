/*
 * Create a list that holds all of your cards
 */
const pics = [
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb"
];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//  Create the Card Grid
const cardGrid = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

let hasClicked = false;
let timer;
let timerInterval;

function init() {
  //   shuffle(pics);
  for (let i = 0; i < pics.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${pics[i]}"></i>`;
    cardGrid.appendChild(card);
    click(card);
  }
  document.getElementById("timer").innerHTML = 0;
}

// Click Card
function click(card) {
  card.addEventListener("click", function() {
    if (!hasClicked) {
      startTimer();
      hasClicked = true;
    }
    const currentCard = this;
    const previousCard = openedCards[0];

    if (openedCards.length === 1) {
      card.classList.add("open", "show", "disable");
      openedCards.push(this);
      compare(currentCard, previousCard);
    } else {
      currentCard.classList.add("open", "show", "disable");
      openedCards.push(this);
    }
  });
}

// Compare Cards
function compare(currentCard, previousCard) {
  if (currentCard.innerHTML === previousCard.innerHTML) {
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCards.push(currentCard, previousCard);
    openedCards = [];

    isOver();
  } else {
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
    }, 750);
    openedCards = [];
  }
  addMoves();
}

function isOver() {
  if (matchedCards.length === pics.length) {
    stopTimer();
    modal.style.display = "block";
    document.getElementById(
      "modalText"
    ).innerHTML = `Congratulations! Your total time was ${timer} seconds. You received ${
      document.getElementsByClassName("fa-star").length
    }/3 stars. Would you like to play again? Hit restart button!`;
  }
}

/*
 * Add Move
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function addMoves() {
  moves++;
  movesContainer.innerHTML = moves;

  rating();
}

/*
 * Rating System
 */
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;

function rating() {
  if (moves < 14) {
    starsContainer.innerHTML = star + star + star;
  } else if (moves < 18) {
    starsContainer.innerHTML = star + star;
  } else {
    starsContainer.innerHTML = star;
  }
}

/*
 * Restart
 */
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
  cardGrid.innerHTML = "";
  init();
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = star + star + star;
  stopTimer();
  hasClicked = false;
});

init();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * Starts the timer
 */
function startTimer() {
  timer = 0;
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById("timer").innerHTML = timer;
  }, 1000);
}

function stopTimer() {
  clearTimeout(timerInterval);
}

/**
 * Modal
 */
// Get the modal
const modal = document.getElementById("modal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
