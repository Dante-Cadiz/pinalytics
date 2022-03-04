let frameSubmit = document.getElementById("frame-submit");
frameSubmit.addEventListener("submit", countAttempt);
let frames = 0;
let maxFrames = 9;
let totalScore = 0;
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
    console.log("frame bowled");
    recordScore();
  } else {
    console.log("10 frames bowled");
    recordScore();
    finishGame();
  }
}

function recordScore() {
  let input1 = document.getElementById("attempt-1-input").value;
  let input2 = document.getElementById("attempt-2-input").value;
 if (input1 === "X") {
     frameArray.push("10");
     console.log("strike");
  } else if (input2 === "/") {
     frameArray.push("10");
     console.log("spare");
  }else  {
  frameArray.push(input1, input2);
}
let scoreTable = document.getElementById("score-column");
  if (frames === 9) {
  let input3 = document.getElementById("attempt-3-input").value;
  frameArray.push(input3);
  let scoreHtml = ` <td>${input1}</td>
 <td>${input2}</td>
 <td>${input3}</td>
 `
 scoreTable.innerHTML += scoreHtml;
} else {
let scoreHtml = ` <td>${input1}</td>
 <td>${input2}</td>
 `
 scoreTable.innerHTML += scoreHtml;
}
checkLastValue();
}

function checkLastValue() {
let scores = document.getElementById("score-column").children;
let previous = scores[scores.length - 1]
 if (previous === "X") {
     handleFrameAfterStrike();
  } else if (previous === "/") {
     handleFrameAfterSpare();
  } else {
    incrementScore();
  }
}

function incrementScore() {
let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  let penultimate = parseInt(integers.slice(-2, -1));
  let thirdFromLast = parseInt(integers.slice(-3, -2));
  let cumulativeScore = document.getElementById("cumulative-score");
  if (frames === 9) {
  let mostRecentFrame = thirdFromLast + last + penultimate;
  totalScore += mostRecentFrame;
  let cumulativeHtml = `
 <td colspan="3">${totalScore}</td>
 `;
 cumulativeScore.innerHTML += cumulativeHtml;
  } else {
  let mostRecentFrame = last + penultimate;
  totalScore += mostRecentFrame;
  let cumulativeHtml = `
 <td colspan="2">${totalScore}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
  }
}

function handleFrameAfterSpare() {
     let cumulativeScore = document.getElementById("cumulative-score");
  let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  let penultimate = parseInt(integers.slice(-2, -1));
  let thirdFromLast = parseInt(integers.slice(-3, -2));
  let previousFrame = penultimate + thirdFromLast;
  let mostRecentFrame = last + penultimate;
  totalScore += mostRecentFrame;
  totalScore += previousFrame;
  let cumulativeHtml = `
  <td colspan="2">test</td><td colspan="2">${totalScore}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function handleFrameAfterStrike(){
  let cumulativeScore = document.getElementById("cumulative-score");
  let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  let penultimate = parseInt(integers.slice(-2, -1));
  let thirdFromLast = parseInt(integers.slice(-3, -2));
  let previousFrame = last + penultimate + thirdFromLast;
  let mostRecentFrame = last + penultimate;
  totalScore += mostRecentFrame;
  totalScore += previousFrame;
  let cumulativeHtml = `
 <td colspan="2">test</td><td colspan="2">${totalScore}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
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
  <button type="button" id="button">Log Game</button>
  `
  formDiv.innerHTML = html;
  // button onclick event  - create function that creates final td section colspan rowspan 2 , with totalScore value in there
}
