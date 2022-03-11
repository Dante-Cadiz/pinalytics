let frameSubmit = document.getElementById("frame-submit");
frameSubmit.addEventListener("submit", checkValidInput);
// Frame count starts at 0, a frame being 2 attempts at knocking the pins over.
let frames = 0;
let maxFrames = 9;
let totalScore = 0;
let frameArray = [];

// checks whether the input provided by the user is a valid bowling score
function checkValidInput(event) { 
    event.preventDefault();
    let input1 = document.getElementById("attempt-1-input").value;
    let input2 = document.getElementById("attempt-2-input").value;
    let integerInput1 = parseInt(input1);
    let integerInput2 = parseInt(input2);
    // This function looks for a frame count of 9 as opposed to the expected 10 as the frame count starts from 0.
    if (frames === 9) {
        let input3 = document.getElementById("attempt-3-input").value;
        let integerInput3 = parseInt(input3);
        if (integerInput1 < 0 || integerInput2 < 0 || integerInput3 < 0 || integerInput1 + integerInput2 > 9 || integerInput2 + integerInput3 > 9) {
            alert("Invalid input");
            return;
        } else if (input2 === "/" || input3 === "/" || input1 === "X" || input2 === "X" || input3 === "X") {
            countAttempt();
        } else if (isNaN(integerInput1) || isNaN(integerInput2)) {
            alert("Invalid input");
            return;
        } else if (integerInput1 + integerInput2 < 10 && input3) {
            alert("Invalid input");
            return;
        } else {
            countAttempt();
        }
    } else if (integerInput1 < 0 || integerInput2 < 0 || integerInput1 + integerInput2 > 9) {
        alert("Invalid input");
        return;
    } else if ((input1 === "X" && input2 === "") || input2 === "/") {
        countAttempt();
    } else if (isNaN(integerInput1) || isNaN(integerInput2)) {
        alert("Invalid input");
        return;
    } else {
        countAttempt();
    }
}

// background counter function for each frame that detects when 9 frames have been bowled and allows for the special case of frame 10
function countAttempt() {
    logScore();
    if (frames === 8) {
        frames++;
        handle10thFrame();
    } else if (frames < maxFrames) {
        frames++;
    } else {
        finishGame();
    }
}

// posts the user inputs as HTML content to a row within the DOM
function logScore() {
    let input1 = document.getElementById("attempt-1-input").value;
    let input2 = document.getElementById("attempt-2-input").value;
    let integerInput1 = parseInt(input1);
    let integerInput2 = parseInt(input2);
    let scoreTable = document.getElementById("score-column");
    if (frames === 9) {
        let input3 = document.getElementById("attempt-3-input").value;
        let integerInput3 = parseInt(input3);
        if (input3 === "") {
            frameArray.push(integerInput1, integerInput2, 0);
        } else if (input1 === "X") {
            if (input2 === "X") {
                if (input3 === "X") {
                    frameArray.push(10, 10, 10);
                } else {
                    frameArray.push(10, 10, integerInput3);     
                }
        } else if (input3 === "/") {
                let spareHandler = 10 - integerInput2;
                frameArray.push(10, integerInput2, spareHandler);
            } else {
                frameArray.push(10, integerInput2, integerInput3);
            }
        } else if (input2 === "/") {
            let spareHandler = 10 - integerInput1;
            if (input3 === "X") {
                frameArray.push(integerInput1, spareHandler, 10);
            } else {
                frameArray.push(integerInput1, spareHandler, integerInput3);
            }
        }
        let scoreHtml = ` <td class="attempt1-score">${input1}</td>
 <td class="attempt2-score">${input2}</td>
 <td class="attempt3-score">${input3}</td>
 `
        scoreTable.innerHTML += scoreHtml;
    } else if (input1 === "X") {
        frameArray.push(10, 0);
        let scoreHtml = ` <td class="attempt1-score"></td>
 <td class="attempt2-score">${input1}</td>
 `
        scoreTable.innerHTML += scoreHtml;
    } else if (input2 === "/") {
        let spareHandler = 10 - integerInput1;
        frameArray.push(integerInput1, spareHandler);
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
    document.getElementById("frame-submit").reset();
}

// checks the way in which the score should be incremented depending on a variety of conditions and scores in previous frames
function checkScore() {
    let last = parseInt(frameArray.slice(-1));
    let penultimate = parseInt(frameArray.slice(-2, -1));
    let thirdFromLast = parseInt(frameArray.slice(-3, -2));
    let fourthFromLast = parseInt(frameArray.slice(-4, -3));
    let sixthFromLast = parseInt(frameArray.slice(-6, -5));
    if (frames === 9) {
        score10thFrame();
    } else if (penultimate === 10) {
        if (fourthFromLast === 10) {
            if (sixthFromLast === 10) {
                scoreTurkey();
            } else {
                scoreDouble();
            }
        } else if (fourthFromLast + thirdFromLast === 10) {
            scoreStrikeAfterSpare();
        } else {
            scoreStrikeOrSpare();
        }
    } else if (last + penultimate === 10 && last > 0) {
        if (fourthFromLast === 10) {
            if (sixthFromLast === 10) {
                scoreSpareAfter2Strikes();
            } else {
                scoreSpareAfterStrike();
            }
        } else if (thirdFromLast + fourthFromLast === 10 && thirdFromLast > 0) {
            scoreSpareAfterSpare();
        } else {
            scoreStrikeOrSpare();
        }
    } else {
        if (fourthFromLast === 10) {
            if (sixthFromLast === 10) {
                scoreAfter2Strikes();
            } else {
                scoreAfterStrike();
            }
        } else if (thirdFromLast + fourthFromLast === 10 && thirdFromLast > 0) {
            scoreAfterSpare();
        } else {
            score();
        }
    }
}

// scores the second consecutive strike
function scoreDouble() {
    totalScore += 10;
}

// scores a spare following a strike in the previous frame
function scoreSpareAfterStrike() {
    let cumulativeScore = document.getElementById("cumulative-score");
    let last = parseInt(frameArray.slice(-1));
    let penultimate = parseInt(frameArray.slice(-2, -1));
    let fourthFromLast = parseInt(frameArray.slice(-4, -3));
    totalScore += last;
    totalScore += penultimate;
    totalScore += fourthFromLast;
    let cumulativeHtml = `
 <td colspan="2">${totalScore - (last + penultimate)}</td>
 `;
    cumulativeScore.innerHTML += cumulativeHtml;
}

// scores a non strike or spare attempt after a previous strike
function scoreAfterStrike() {
    let cumulativeScore = document.getElementById("cumulative-score");
    let last = parseInt(frameArray.slice(-1));
    let penultimate = parseInt(frameArray.slice(-2, -1));
    totalScore += last;
    totalScore += penultimate;
    totalScore += last;
    totalScore += penultimate;
    let cumulativeHtml = `
 <td colspan="2">${totalScore - (last + penultimate)}</td> <td colspan="2">${totalScore}</td>
  `;
    cumulativeScore.innerHTML += cumulativeHtml;
}

// scores three strikes in a row, known in bowling parlance as a 'turkey'
function scoreTurkey() {
    let cumulativeScore = document.getElementById("cumulative-score");
    let penultimate = parseInt(frameArray.slice(-2, -1));
    let fourthFromLast = parseInt(frameArray.slice(-4, -3));
    let sixthFromLast = parseInt(frameArray.slice(-6, -5));
    let turkey = penultimate + fourthFromLast + sixthFromLast;
    totalScore += turkey;
    let cumulativeHtml = `
 <td colspan="2">${totalScore - (fourthFromLast + penultimate)}</td>
 `;
    cumulativeScore.innerHTML += cumulativeHtml;
}

// scores a spare following 2 strikes
function scoreSpareAfter2Strikes() {
    let cumulativeScore = document.getElementById("cumulative-score");
    let last = parseInt(frameArray.slice(-1));
    let penultimate = parseInt(frameArray.slice(-2, -1));
    let sixthFromLast = parseInt(frameArray.slice(-6, -5));
    let fourthFromLast = parseInt(frameArray.slice(-4, -3));
    totalScore += fourthFromLast;
    totalScore += sixthFromLast;
    totalScore += (2*penultimate);
    totalScore += last;
    let cumulativeHtml = `
 <td colspan="2">${totalScore - (last + sixthFromLast + fourthFromLast)}</td><td colspan="2">${totalScore - (last + penultimate)}</td>
 `;
    cumulativeScore.innerHTML += cumulativeHtml;
}

// scores a non strike or spare attempt that follows 2 strikes
function scoreAfter2Strikes() {
    let cumulativeScore = document.getElementById("cumulative-score");
    let last = parseInt(frameArray.slice(-1));
    let penultimate = parseInt(frameArray.slice(-2, -1));
    let fourthFromLast = parseInt(frameArray.slice(-4, -3));
    totalScore += (2 * last);
    totalScore += (3 * penultimate);
    totalScore += fourthFromLast;
    let cumulativeHtml = `
 <td colspan="2">${totalScore - (fourthFromLast + 2*(last + penultimate))}</td><td colspan="2">${totalScore - (last + penultimate)}</td><td colspan="2">${totalScore}</td>
 `;
    cumulativeScore.innerHTML += cumulativeHtml;
}

// scores a strike that follows a spare
function scoreStrikeAfterSpare() {
    let cumulativeScore = document.getElementById("cumulative-score");
    let penultimate = parseInt(frameArray.slice(-2, -1));
    let thirdFromLast = parseInt(frameArray.slice(-3, -2));
    let fourthFromLast = parseInt(frameArray.slice(-4, -3));
    totalScore += penultimate;
    totalScore += thirdFromLast;
    totalScore += fourthFromLast;
    let cumulativeHtml = `
  <td colspan="2">${totalScore - penultimate}</td>
 `;
    cumulativeScore.innerHTML += cumulativeHtml;
}

// scores a spare that follows another spare
function scoreSpareAfterSpare() {
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

// scores an attempt that follows a spare
function scoreAfterSpare() {
    let cumulativeScore = document.getElementById("cumulative-score");
    let last = parseInt(frameArray.slice(-1));
    let penultimate = parseInt(frameArray.slice(-2, -1));
    totalScore += penultimate;
    totalScore += penultimate;
    totalScore += last;
    let cumulativeHtml = `
  <td colspan="2">${totalScore - (last + penultimate)}</td><td colspan="2">${totalScore}</td>
 `;
    cumulativeScore.innerHTML += cumulativeHtml;
}

// scores either a strike or a spare
function scoreStrikeOrSpare() {
    totalScore += 10;
}

// scores an ordinary attempt with no special preceeding case
function score() {
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

// creates the HTML for frame 10, in which the player may possibly bowl 3 frames
function handle10thFrame() {
    let form = document.getElementById("frame-submit");
    let html = `
     <label for="attempt-1-input">Attempt 1</label>
            <input type="text" id="attempt-1-input" name="attempt-1-input" required>
            <br>
            <label for="attempt-2-input">Attempt 2</label>
            <input type="text" id="attempt-2-input" name="attempt-2-input">
            <br>
            <label for="attempt-3-input">Attempt 3</label>
            <input type="text" id="attempt-3-input" name="attempt-3-input">
            <input type="submit" class="submit-button" value="Record Score"></input>
     `;
    form.innerHTML = html;
}

// scores the unique scenario of the 10th frame depending on past cases
function score10thFrame() {
    let cumulativeScore = document.getElementById("cumulative-score");
    let last = parseInt(frameArray.slice(-1));
    let penultimate = parseInt(frameArray.slice(-2, -1));
    let thirdFromLast = parseInt(frameArray.slice(-3, -2));
    let fourthFromLast = parseInt(frameArray.slice(-4, -3));
    let fifthFromLast = parseInt(frameArray.slice(-5, -4));
    let seventhFromLast = parseInt(frameArray.slice(-7, -6));
    totalScore += thirdFromLast;
    totalScore += penultimate;
    totalScore += last;
    if (fifthFromLast === 10) {
        if (seventhFromLast === 10) {
            totalScore += fifthFromLast;
            totalScore += (2* thirdFromLast);
            totalScore += penultimate;
            let cumulativeHtml = `
      <td colspan="2">${totalScore - (fifthFromLast + 2*(penultimate + thirdFromLast) + last)}</td><td colspan="2">${totalScore - (last + penultimate + thirdFromLast)}</td><td colspan="3">${totalScore}</td>
      `;
            cumulativeScore.innerHTML += cumulativeHtml;
        } else {
            totalScore += thirdFromLast;
            totalScore += penultimate;
            let cumulativeHtml = `
 <td colspan="2">${totalScore - (last + penultimate + thirdFromLast)}</td> <td colspan="3">${totalScore}</td>
  `;
            cumulativeScore.innerHTML += cumulativeHtml;
        }
    } else if (fourthFromLast + fifthFromLast === 10 && fourthFromLast != 0) {
        totalScore += thirdFromLast;
        let cumulativeHtml = `
  <td colspan="2">${totalScore - (last + penultimate + thirdFromLast)}</td><td colspan="3">${totalScore}</td>
 `;
        cumulativeScore.innerHTML += cumulativeHtml;
    } else {
        let cumulativeHtml = `
 <td colspan="3">${totalScore}</td>
 `;
        cumulativeScore.innerHTML += cumulativeHtml;
    }
    postFinalScore();
}

// finishes the game, creating a reset button for the user to press in order to refresh the page with an empty scoreboard
function finishGame() {
    let formDiv = document.getElementById("form-wrapper");
    let html = `
  <button type="button" class="submit-button" id="reset-button" onClick="window.location.reload();">Reset</button>
  `;
    formDiv.innerHTML = html;
}

// posts the final score to the total score column once 10 frames are bowled
function postFinalScore() {
    let scoreTable = document.getElementById("score-column");
    let finalScoreHtml = `
 <td rowspan="2" id="final-score">${totalScore}</td>
 `;
    scoreTable.innerHTML += finalScoreHtml;
}

