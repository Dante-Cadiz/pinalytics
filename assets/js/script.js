let frameSubmit = document.getElementById("frame-submit")
frameSubmit.addEventListener("submit", recordScore);


function recordScore(event) {
  event.preventDefault();
  let input1 = parseInt(document.getElementById("attempt-1-input").value);
  let input2 = parseInt(document.getElementById("attempt-2-input").value);
  console.log('Attempt 1:' , input1);
  console.log('Attempt 2:' , input2);
}


function calculateFrameScore() {
}

function calculateTotalScore() {

}

function calculateAverage() {

}

function countStrike() {

}

function countSpare() {

}

function incrementStrikeCount() {

}

function incrementSpareCount() {

}

function updateHighScore() {

}