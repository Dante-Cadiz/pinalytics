let frameSubmit = document.getElementById("frame-submit");
frameSubmit.addEventListener("submit", checkLastValue);
let frames = 0;
let maxFrames = 9;
let totalScore = 0;
let frameArray = [];


function checkLastValue(event) {
  event.preventDefault();
let previousText = frameArray[frameArray.length -1];
if (previousText === "10 strike") {
   recordScore();
     handleFrameAfterStrike();
  } else if (previousText === "10 spare") {
    recordScore();
     handleFrameAfterSpare();
  } else {
    recordScore();
    incrementScore();
  }
  countAttempt();
}

function countAttempt() {
  if (frames === 8) {
    console.log("9 frames bowled");
    handle10thFrame();
    frames++;
  } else if (frames < maxFrames) {
    frames++;
    console.log("frame bowled");
  } else {
    console.log("10 frames bowled");
    finishGame();
  }
}


function recordScore() {
  let input1 = document.getElementById("attempt-1-input").value;
  let input2 = document.getElementById("attempt-2-input").value;
  let scoreTable = document.getElementById("score-column");
 if (input1 === "X") {
     frameArray.push("10 strike");
     console.log("strike");
     let scoreHtml = `<td></td>
 <td>${input1}</td>
 `;
     scoreTable.innerHTML += scoreHtml;
  } else if (input2 === "/") {
     frameArray.push("10 spare");
     console.log("spare");
     let scoreHtml = ` <td>${input1}</td>
 <td>${input2}</td>
 `;
 scoreTable.innerHTML += scoreHtml;  
  }else if (frames === 9) {
  let input3 = document.getElementById("attempt-3-input").value;
  frameArray.push(input1, input2, input3);
  let scoreHtml = ` <td>${input1}</td>
 <td>${input2}</td>
 <td>${input3}</td>
 `;
 scoreTable.innerHTML += scoreHtml;
} else {
  frameArray.push(input1, input2);
let scoreHtml = ` <td>${input1}</td>
 <td>${input2}</td>
 `
 scoreTable.innerHTML += scoreHtml;
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
