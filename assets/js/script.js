// 'initialise' function to create input fields, so that it is editable on 10th go

let frameSubmit = document.getElementById("frame-submit");
frameSubmit.addEventListener("submit", countAttempt);
let frames = 0;
let maxFrames = 9;
let frameArray = [];

function countAttempt(event) {
  event.preventDefault();
  if (frames === 8) {
    console.log("9 frames bowled");
    recordScore();
    handle10thFrame();
    frames++;
  } else if (frames < maxFrames) {
    frames++;
    recordScore();
    console.log("frame bowled");
  } else {
    recordScore();
    console.log("10 frames bowled");
    finishGame();
  }
}


function recordScore() {
  let input1 = document.getElementById("attempt-1-input").value;
  let input2 = document.getElementById("attempt-2-input").value;
  let scoreTable = document.getElementById("score-column");
  let cumulativeScore = document.getElementById("cumulative-score");
  if (input1 === "X") {
     countStrike();
     console.log("strike")
     frameArray.push(input1, 0)
  } else if (input2 === "/") {
     countSpare();
     console.log("spare");
     frameArray.push(input1, input2);
  }else  {
  frameArray.push(input1, input2);
}
console.log(frameArray);

if (frames === 9) {
  let input3 = document.getElementById("attempt-3-input").value;
  let scoreHtml = ` <td class="attempt1-score">${input1}</td>
 <td class="attempt2-score">${input2}</td>
 <td class="attempt3-score">${input3}</td>
 `
 scoreTable.innerHTML += scoreHtml;
 let cumulativeHtml = `
 <td colspan="3"></td>
 `
 cumulativeScore.innerHTML += cumulativeHtml;
} else {
let scoreHtml = ` <td class="attempt1-score">${input1}</td>
 <td class="attempt2-score">${input2}</td>
 `
 scoreTable.innerHTML += scoreHtml;
 let cumulativeHtml = `
 <td colspan="2"></td>
 `
 cumulativeScore.innerHTML += cumulativeHtml;
}
}


  //for (let i = 0; i<scores.length; i++) {
    //scores[i].addEventListener()
  // - most important thing now - figure out how to register the numerical frames variable in the loop that fills in the table for the user
  //score colum children[frames] ??      

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

function handle10thFrame() {
  let form = document.getElementById("frame-submit");
     let html = `
     <label for="attempt-1-input">Attempt 1</label>
            <input type="text" id="attempt-1-input" name="attempt-1-input" required>
            <label for="attempt-2-input">Attempt 2</label>
            <input type="text" id="attempt-2-input" name="attempt-2-input">
            <label for="attempt-3-input">Attempt 3</label>
            <input type="text" id="attempt-3-input" name="attempt-3-input">
            <input type="submit" value="Record Score"></input>
     `;
     form.innerHTML = html;
}

function finishGame() {
  let formDiv = document.getElementById("form-wrapper");
  let html = `
  <button type="button" class="button">Log Game</button>
  `
  formDiv.innerHTML = html;
}

function calculateAverage() {
// take all total scores, add them together, and divide that by number of times played
}


function updateHighScore() {
//find highest score of logged scores and display it
}