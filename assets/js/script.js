let frameSubmit = document.getElementById("frame-submit")
frameSubmit.addEventListener("submit", recordScore);


function recordScore(event) {
  event.preventDefault();
  let input1 = parseInt(document.getElementById("attempt-1-input").value);
  let input2 = parseInt(document.getElementById("attempt-2-input").value);
  // work out how to do this so that each individual recording logs the score to the next empty td element
  // as well as possibly logging each individual attempt score (as an array) before adding them together

}

function calculateTotalScore() {
  // take values that have been put inside the DOM table by the recordScore function and adds them to each other each time a new frame is completed
}


function countStrike() {
           // call this function in the calculateTotalScore function when user logs an "X" on first attempt - counts next 2 attempts towards strike score.
}

function countSpare() {
//call this function in the calculateTotalScore function when user logs a "/" on second attempt - adds next ball to total
}

function recordTotalScore {
  //once game is completed, record total score to console
}

function calculateAverage() {
// take all total scores, add them together, and divide that by number of times played
}


function updateHighScore() {
//find highest score of logged scores and display it
}