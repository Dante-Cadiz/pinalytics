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
    handle10thFrame();
    frames++;
  } else if (frames < maxFrames) {
    frames++;
    console.log("frame bowled");
  } else {
    console.log("10 frames bowled");
    finishGame();
  }
  logScore();
}

function logScore() {
let input1 = document.getElementById("attempt-1-input").value;
  let input2 = document.getElementById("attempt-2-input").value;
   if (input1 === "X") {
     frameArray.push("10 strike");
     console.log("strike");
     ;
  } else if (input2 === "/") {
     frameArray.push("10 spare");
     console.log("spare");
     ;
  }else if (frames === 9) {
  let input3 = document.getElementById("attempt-3-input").value;
  frameArray.push(input1, input2, input3);
  ;
} else {
  frameArray.push(input1, input2);
}
checkScore();
}

function checkScore() {
  let previousText = frameArray[frameArray.length -1];
if (previousText === "10 strike") {
  if () {
  scoreStrikeAfterStrike();
} else if () {
  scoreStrikeAfterSpare();
} else {
  scoreStrike();
}
  } else if (previousText === "10 spare") {
   if () {
    scoreSpareAfterStrike();
} else if () {
    scoreSpareAfterSpare();
} else {
    scoreSpare();
}
  } else {
 if () {
    scoreAfterStrike();
} else if () {
    scoreAfterSpare();
} else {
    score();
}
  }
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
