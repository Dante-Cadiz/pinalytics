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
  } else if (input2 === "/") {
     countSpare();
  }else  {
  frameArray.push(input1, input2);
}
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
incrementScore();
}

function incrementScore() {
  console.log(frameArray);
  //iterate across the array in here
}


function countStrike() {
  let input1 = document.getElementById("attempt-1-input").value;
  let input2 = document.getElementById("attempt-2-input").value;
           console.log("strike");
     frameArray.push(input1);
          }

function countSpare() {
  let input1 = document.getElementById("attempt-1-input").value;
  let input2 = document.getElementById("attempt-2-input").value;
       console.log("spare");
     frameArray.push(input1, input2);
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

function undoLastEntry() {}

function calculateAverage() {
// take all total scores, add them together, and divide that by number of times played
}


function updateHighScore() {
//find highest score of logged scores and display it
}