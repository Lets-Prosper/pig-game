'use strict';

// Defining classes

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let currentScore = 0;
let activePlayer = 0;

let playing = true;

const score = [0, 0];

// functions

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Default display

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Add dice rolling functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice roll

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check dice score

    if (dice !== 1) {
      // Update Current

      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player

      switchPlayer();
    }
  }
});

// Hold Functionality

btnHold.addEventListener('click', function () {
  if (playing) {
    // add up and display score

    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // Check for winner

    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Resetting the game
btnNew.addEventListener('click', function () {
  playing = true;

  // Change player's scores to 0
  score[0] = 0;
  score[1] = 0;
  score0El.textContent = score[0];
  score1El.textContent = score[1];

  // Update player background
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  // set active player to default
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  // Update and display current
  currentScore = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
});
