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
  let integerInput1 = parseInt(input1);
  let integerInput2 = parseInt(input2);
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
     frameArray.push(10);
     console.log("strike");
     let scoreHtml = ` <td class="attempt1-score"></td>
 <td class="attempt2-score">${input1}</td>
 `
 scoreTable.innerHTML += scoreHtml;
  } else if (input2 === "/") {
    let spareHandler = 10 - integerInput1;
     frameArray.push(integerInput1, spareHandler);
     console.log("spare");
     let scoreHtml = ` <td class="attempt1-score">${input1}</td>
 <td class="attempt2-score">/</td>
 `
     scoreTable.innerHTML += scoreHtml;
  } else {
  frameArray.push(integerInput1, integerInput2);
  let scoreHtml = ` <td class="attempt1-score">${input1}</td>
 <td class="attempt2-score">${input2}</td>
 `
  scoreTable.innerHTML += scoreHtml;
}
checkScore();
}

function checkScore() {
  let last = parseInt(frameArray.slice(-1));
  let penultimate = parseInt(frameArray.slice(-2, -1));
  let thirdFromLast = parseInt(frameArray.slice(-3, -2));
  let fourthFromLast = parseInt(frameArray.slice(-4, -3));
  if (frames === 9) {
    score10thFrame();
  }
else if (last === 10) {
  if (penultimate === 10) {
    if (thirdFromLast === 10) {
      scoreTurkey();
    } else { 
      scoreDouble();
    }
} else if (penultimate + thirdFromLast === 10) {
  scoreStrikeAfterSpare();
} else {
  scoreStrikeOrSpare();
}
  } else if (last + penultimate === 10) {
   if (thirdFromLast === 10) {
     if (fourthFromLast === 10) {
      scoreSpareAfter2Strikes();
     } else {
    scoreSpareAfterStrike();
     }
} else if (thirdFromLast + fourthFromLast === 10) {
    scoreSpareAfterSpare();
} else {
    scoreStrikeOrSpare();
}
  } else {
 if (thirdFromLast === 10) {
   if (fourthFromLast === 10) {
      scoreAfter2Strikes();
     } else {
    scoreAfterStrike(); 
    }
} else if (thirdFromLast + fourthFromLast === 10) {
    scoreAfterSpare();
} else {
    score();
}
  }
}

function scoreDouble() {
  console.log("double");
  totalScore += 10;
}

function scoreSpareAfterStrike() {
  console.log("spare after strike");
  let cumulativeScore = document.getElementById("cumulative-score");
  let last = parseInt(frameArray.slice(-1));
  let penultimate = parseInt(frameArray.slice(-2, -1));
  let thirdFromLast = parseInt(frameArray.slice(-3, -2));
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
  let last = parseInt(frameArray.slice(-1));
  let penultimate = parseInt(frameArray.slice(-2, -1));
  totalScore += last;
  totalScore += penultimate;
  totalScore += last;
  totalScore += penultimate;
  let cumulativeHtml = `
 <td colspan="2">${totalScore - (last + penultimate)}</td> <td colspan="2">${totalScore}</td>
  `
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreTurkey() {
  console.log("turkey");
 let cumulativeScore = document.getElementById("cumulative-score");
  let last = parseInt(frameArray.slice(-1));
  let penultimate = parseInt(frameArray.slice(-2, -1));
  let thirdFromLast = parseInt(frameArray.slice(-3, -2));
  let turkey = last + penultimate + thirdFromLast;
  totalScore += turkey;
  let cumulativeHtml = `
 <td colspan="2">${totalScore - (last + penultimate)}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreSpareAfter2Strikes() {
  console.log("spare after 2 strikes");
  let cumulativeScore = document.getElementById("cumulative-score");
 let last = parseInt(frameArray.slice(-1));
  let penultimate = parseInt(frameArray.slice(-2, -1));
  let thirdFromLast = parseInt(frameArray.slice(-3, -2));
  let fourthFromLast = parseInt(frameArray.slice(-4, -3));
  totalScore += fourthFromLast;
  totalScore += thirdFromLast;
  totalScore += penultimate;
  totalScore += last;
  let cumulativeHtml = `
 <td colspan="2">${totalScore - (last + thirdFromLast + fourthFromLast)}</td><td colspan="2">${totalScore - (last)}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreAfter2Strikes() {
  console.log("attempt after 2 strikes");
  let cumulativeScore = document.getElementById("cumulative-score");
  let last = parseInt(frameArray.slice(-1));
  let penultimate = parseInt(frameArray.slice(-2, -1));
  let thirdFromLast = parseInt(frameArray.slice(-3, -2));
  totalScore += last;
  totalScore += penultimate;
  totalScore += last;
  totalScore += penultimate;
  totalScore += penultimate;
  totalScore += thirdFromLast;
  let cumulativeHtml = `
 <td colspan="2">${totalScore - (thirdFromLast + 2*(last + penultimate))}</td><td colspan="2">${totalScore - (last + penultimate)}</td><td colspan="2">${totalScore}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreStrikeAfterSpare() {
  console.log("strike after spare");
 let cumulativeScore = document.getElementById("cumulative-score");
  let last = parseInt(frameArray.slice(-1));
  totalScore += last;
  let cumulativeHtml = `
  <td colspan="2">${totalScore}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreSpareAfterSpare() {
  console.log("spare after spare");
 let cumulativeScore = document.getElementById("cumulative-score");
  let last = parseInt(frameArray.slice(-1));
  let penultimate = parseInt(frameArray.slice(-2, -1));
  totalScore += penultimate;
  totalScore += last;
  totalScore += penultimate;
  let cumulativeHtml = `
  <td colspan="2">${totalScore - (last + penultimate)}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreAfterSpare() {
  console.log("attempt after spare");
 let cumulativeScore = document.getElementById("cumulative-score");
  let last = parseInt(frameArray.slice(-1));
  let penultimate = parseInt(frameArray.slice(-2, -1));
  totalScore += last;
  totalScore += penultimate;
  totalScore += penultimate;
  let cumulativeHtml = `
  <td colspan="2">${totalScore - (last + penultimate)}</td><td colspan="2">${totalScore}</td>
 `;
  cumulativeScore.innerHTML += cumulativeHtml;
}

function scoreStrikeOrSpare() {
  totalScore += 10;
}

function score() {
  console.log("attempt after attempt");
  let cumulativeScore = document.getElementById("cumulative-score");
  let last = parseInt(frameArray.slice(-1));
  let penultimate = parseInt(frameArray.slice(-2, -1));
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
 let last = parseInt(frameArray.slice(-1));
  let penultimate = parseInt(frameArray.slice(-2, -1));
  let thirdFromLast = parseInt(frameArray.slice(-3, -2));
  if (last + penultimate < 10 && )
  totalScore += last;
  totalScore += penultimate;
}

function finishGame() {
  let formDiv = document.getElementById("form-wrapper");
  let html = `
  <button type="button" id="button">Log Game</button>
  `
  formDiv.innerHTML = html;
}
