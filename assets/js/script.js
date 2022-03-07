let frameSubmit = document.getElementById("frame-submit");
frameSubmit.addEventListener("submit", countAttempt);
let frames = 0;
let maxFrames = 9;
let totalScore = 0;
let frameArray = [];

function countAttempt(event) {
  event.preventDefault();
  logScore();
  if (frames === 8) {
    console.log("9 frames bowled");
    frames++;
    handle10thFrame();
  } else if (frames < maxFrames) {
    frames++;
    console.log("frame bowled");
  } else {
    console.log("10 frames bowled");
    finishGame();
  }
}

function logScore() {
let input1 = document.getElementById("attempt-1-input").value;
  let input2 = document.getElementById("attempt-2-input").value;
   let scoreTable = document.getElementById("score-column");
   if (frames === 9) {
  let input3 = document.getElementById("attempt-3-input").value;
  frameArray.push(input1, input2, input3);
  let scoreHtml = ` <td class="attempt1-score">${input1}</td>
 <td class="attempt2-score">${input2}</td>
 <td class="attempt3-score">${input3}</td>
 `
 scoreTable.innerHTML += scoreHtml;
   } else if (input1 === "X") {
     frameArray.push("10 strike");
     console.log("strike");
     let scoreHtml = ` <td class="attempt1-score"></td>
 <td class="attempt2-score">${input1}</td>
 `
 scoreTable.innerHTML += scoreHtml;
  } else if (input2 === "/") {
     frameArray.push("10 spare");
     console.log("spare");
     let scoreHtml = ` <td class="attempt1-score">${input1}</td>
 <td class="attempt2-score">${input2}</td>
 `
     scoreTable.innerHTML += scoreHtml;
  } else {
  frameArray.push(input1, input2);
  let scoreHtml = ` <td class="attempt1-score">${input1}</td>
 <td class="attempt2-score">${input2}</td>
 `
  scoreTable.innerHTML += scoreHtml;
}
checkScore();
}

function checkScore() {
  let previousScore = frameArray[frameArray.length -1];
  let secondLastScore = frameArray[frameArray.length -2];
  let thirdLastScore = frameArray[frameArray.length -3];
  let fourthLastScore = frameArray[frameArray.length -4];
  if (frames === 9) {
    score10thFrame();
  }
else if (previousScore === "10 strike") {
  if (secondLastScore === "10 strike") {
    if (thirdLastScore === "10 strike") {
      scoreTurkey();
    } else { 
      scoreDouble();
    }
} else if (secondLastScore === "10 spare") {
  scoreCaseAfterSpare();
} else {
  scoreStrike();
}
  } else if (previousScore === "10 spare") {
   if (secondLastScore === "10 strike") {
     if (thirdLastScore === "10 strike") {
      scoreSpareAfter2Strikes();
     } else {
    scoreSpareAfterStrike();
     }
} else if (secondLastScore === "10 spare") {
    scoreCaseAfterSpare();
} else {
    scoreSpare();
}
  } else {
 if (thirdLastScore === "10 strike") {
   if (fourthLastScore === "10 strike") {
      scoreAfter2Strikes();
     } else {
    scoreAfterStrike(); }
} else if (thirdLastScore === "10 spare") {
    scoreAfterSpare();
} else {
    score();
}
  }
}

function scoreDouble() {
  console.log("double");
  let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  let penultimate = parseInt(integers.slice(-2, -1));
  let thirdFromLast = parseInt(integers.slice(-3, -2));
  let previousFrame = last + penultimate + thirdFromLast;
  totalScore += previousFrame;
}

function scoreSpareAfterStrike() {
  console.log("spare after strike");
  let cumulativeScore = document.getElementById("cumulative-score");
  let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  let penultimate = parseInt(integers.slice(-2, -1));
  let thirdFromLast = parseInt(integers.slice(-3, -2));
  let previousFrame = last + penultimate + thirdFromLast;
  totalScore += previousFrame;
  let cumulativeHtml = `
 <td colspan="2">${totalScore}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreAfterStrike() {
  console.log("attempt after strike");
  let cumulativeScore = document.getElementById("cumulative-score");
  let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  let penultimate = parseInt(integers.slice(-2, -1));
  let thirdFromLast = parseInt(integers.slice(-3, -2));
  let previousFrame = last + penultimate + thirdFromLast;
  totalScore += previousFrame;
  let cumulativeHtml = `
 <td colspan="2">test</td> <td colspan="2">${totalScore}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreTurkey() {
  console.log("turkey");
 let cumulativeScore = document.getElementById("cumulative-score");
  let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  let penultimate = parseInt(integers.slice(-2, -1));
  let thirdFromLast = parseInt(integers.slice(-3, -2));
  let turkey = last + penultimate + thirdFromLast;
  totalScore += turkey;
  let cumulativeHtml = `
 <td colspan="2">test</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreSpareAfter2Strikes() {
  console.log("spare after 2 strikes");
  let cumulativeScore = document.getElementById("cumulative-score");
  let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  let penultimate = parseInt(integers.slice(-2, -1));
  let thirdFromLast = parseInt(integers.slice(-3, -2));
  let cumulativeHtml = `
 <td colspan="2">test</td><td colspan="2">test</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreAfter2Strikes() {
  console.log("attempt after 2 strikes");
  let cumulativeScore = document.getElementById("cumulative-score");
  let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  let penultimate = parseInt(integers.slice(-2, -1));
  let thirdFromLast = parseInt(integers.slice(-3, -2));
  let cumulativeHtml = `
 <td colspan="2">test</td><td colspan="2">test</td><td colspan="2">test</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreCaseAfterSpare() {
  console.log("strike/spare after spare");
 let cumulativeScore = document.getElementById("cumulative-score");
  let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  let penultimate = parseInt(integers.slice(-2, -1));
  let thirdFromLast = parseInt(integers.slice(-3, -2));
  let previousFrame = penultimate + thirdFromLast;
  totalScore += previousFrame;
  let cumulativeHtml = `
  <td colspan="2">${totalScore}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreAfterSpare() {
  console.log("attempt after spare");
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
  let cumulativeHtml = `
  <td colspan="2"></td> <td colspan="2">${totalScore}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreStrike() {
  console.log("strike after attempt");
  let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  totalScore += last;
}

function scoreSpare() {
  console.log("spare after attempt");
  let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  totalScore += last;
}

function score() {
  console.log("attempt after attempt");
  let integers = frameArray.map(function (y) {
    return parseInt(y, 10);
  });
  console.log(integers);
  let last = parseInt(integers.slice(-1));
  let penultimate = parseInt(integers.slice(-2, -1));
  let cumulativeScore = document.getElementById("cumulative-score");
  let mostRecentFrame = last + penultimate;
  totalScore += mostRecentFrame;
  let cumulativeHtml = `
 <td colspan="2">${totalScore}</td>
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

function score10thFrame() {
console.log("scoring 10th frame");
}

function finishGame() {
  let formDiv = document.getElementById("form-wrapper");
  let html = `
  <button type="button" id="button">Log Game</button>
  `
  formDiv.innerHTML = html;
}
