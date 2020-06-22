const total = 20;
const speed = 150;
const returnSec = 1000;
let cat = [];
let index;
let first = true;
let index1;
let card1;
let card2;
let pair = 0;

let timer = 100;
let score = 0;

function cardlock() {
  $('#card li:eq(' + index + ')').addClass('lock');
}

function cardClose(i, n) {
  $('#card li:eq(' + i + ')')
    .stop()
    .animate({ left: '75' }, speed);
  $('#card li:eq(' + i + ') img')
    .stop()
    .animate({ width: '0', height: '200px' }, speed, function () {
      n(i);
    });
}

function omoteOpen() {
  $('#card li:eq(' + index + ') img').attr(
    'src',
    'img/card' + cat[index] + '.jpg'
  );
  $('#card li:eq(' + index + ') img')
    .stop()
    .animate({ width: '150px', height: '200px' }, speed);
  $('#card li:eq(' + index + ')')
    .stop()
    .animate({ left: '0' }, speed);
}

function uraOpen(j) {
  $('#card li:eq(' + j + ') img').attr('src', 'img/card.png');
  $('#card li:eq(' + j + ') img')
    .stop()
    .animate({ width: '150px', height: '200px' }, speed);
  $('#card li:eq(' + j + ')')
    .stop()
    .animate({ left: '0' }, speed);
}

function scoreDisplay() {
  $('#score').text(score);
}

function plusScore() {
  score += 10;
  scoreDisplay();
}

function minusScore() {
  score -= 5;
  scoreDisplay();
}

function comparison() {
  if (card1 == card2) {
    $('#card li:eq(' + index + ')').addClass('off');
    $('#card li:eq(' + index1 + ')').addClass('off');
    pair++;
    plusScore();
    if (pair == total / 2) {
      setTimeout(function () {
        alert('Finish!');
        alert(`Your score is ${score} !!`);
      }, returnSec);
    }
  } else {
    minusScore();
    setTimeout(function () {
      cardClose(index, uraOpen);
      cardClose(index1, uraOpen);
    }, returnSec);
  }
  first = true;
  card2 = 0;
  setTimeout(function () {
    unlock();
  }, returnSec + speed * 2);
}

function textDisplay() {
  $('#timer').text(timer);
}

function countDown() {
  timer--;
  textDisplay();
}

function alllock() {
  $('#card li').addClass('lock');
}

function unlock() {
  $('#card li').removeClass('lock');
}

//ここから開始
$(function () {
  for (i = 1; i <= total / 2; i++) {
    cat.push(i, i);
  }

  cat.sort(function () {
    return Math.random() - Math.random();
  });

  for (i = 1; i <= total; i++) {
    $('#card').append("<li><img src='img/card.png'></li>");
  }

  textDisplay();
  scoreDisplay();

  $('#start-button').click(function () {
    setInterval(function () {
      if (timer <= 0) {
        alert('Game Over !!');
      } else {
        countDown();
      }
    }, 1000);

    $('#card li').click(function () {
      index = $('#card li').index(this);
      cardlock();
      cardClose(index, omoteOpen);

      if (first == true) {
        index1 = index;
        card1 = cat[index];
        first = false;
      } else {
        alllock();
        card2 = cat[index];
        comparison();
      }
    });
  });
});
