let frameSubmit = document.getElementById("frame-submit");
frameSubmit.addEventListener("submit", recordScore);


function countAttempt() {
  console.log("frame submitted");
}

// run counter in background script to count attempts, increase counter to 1 for each attempt and and update DOM elements
// add sequence number in HTML elements to correspond with javascript counter

// target document.getElementById("score-column").children;  (children [0] for first one etc.)
// for loop matching counter for them

function recordScore(event) {
  event.preventDefault();
  let input1 = document.getElementById("attempt-1-input").value;
  let input2 = document.getElementById("attempt-2-input").value;
  if (input1 === "X") {
     countStrike();
     console.log("strike")
  } else if (input2 === "/") {
    parseInt(input1);
     countSpare();
     console.log("spare");
  }else  {
  parseInt(input1);
  parseInt(input2);
  console.log(input1, input2);
}
countAttempt();
}

  //let scoreArray = [input1, input2];
  //let scores = document.getElementById("score-column").children;
  //for (let i = 0; i<scores.length; i++) {
    //scores[i].addEventListener()
  

      

  // parseInput (X) == 10 or (/) == 10 - in these 2 special cases prevent the usual function - continue or pass loop?  run loop up to counter - no. of attempts
  // then keep on capturing input in 2 arrays
  // work out how to do this so that each individual recording logs the score to the next empty td element
  // as well as possibly logging each individual attempt score (as an array) before adding them together
  // array values added to score column, added value added to cumulative score column
  //triggers next function?
// split into 3 functions, user input, processing of data, displaying values in DOM
// just put it in array and iterate over it? maybe just 1 function



function incrementScore() {
  // take values that have been put inside the DOM table by the recordScore function and adds them to each other each time a new frame is completed
  let scores = document.getElementById
}


function countStrike() {
           // call this function in the calculateTotalScore function when user logs an "X" on first attempt - counts next 2 attempts towards strike score.
           let input1 = parseInt(document.getElementById("attempt-1-input").value);
          }

function countSpare() {
//call this function in the calculateTotalScore function when user logs a "/" on second attempt - adds next ball to total
let input2 = parseInt(document.getElementById("attempt-2-input").value);
}

function recordTotalScore() {
  //once game is completed, record total score to console
}

function calculateAverage() {
// take all total scores, add them together, and divide that by number of times played
}


function updateHighScore() {
//find highest score of logged scores and display it
}