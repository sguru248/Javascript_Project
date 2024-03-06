'use strict';

// Refactoring the code

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let hignScore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const hiddenNumber = function (message) {
  document.querySelector('.number').textContent = message;
};

const backgroundColor = function (message) {
  document.querySelector('body').style.backgroundColor = message;
};

const divWidth = function (message) {
  document.querySelector('.number').style.width = message;
};

const scores = function (message) {
  document.querySelector('.score').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('⛔ No Number!');
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number');
    hiddenNumber(secretNumber);
    backgroundColor('#60b347');
    divWidth('30rem');

    if (score > hignScore) {
      hignScore = score;
      document.querySelector('.highscore').textContent = hignScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too High!' : '📉Too low!');
      score--;
      scores(score);
    } else {
      displayMessage('😒 You lost the Game!');
      scores(0);
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  scores(score);

  hiddenNumber('?');

  document.querySelector('.guess').value = '';

  backgroundColor('#222');
  divWidth('15rem');
});
