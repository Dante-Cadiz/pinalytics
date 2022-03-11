# Pinalytics

Pinalytics is an interactive bowling scorecard that records and increments scores provided by user inputs frame by frame in accordance with the official rule set of 10 pin bowling. This application uses JavaScript to calculate bowling scores and post them to the DOM in a constantly updating and responsive scoreboard table for the user. It is intended for use by bowlers while they are playing their games, allowing them to automatically calculate their scores instead of having to use a pen-and-paper scoresheet and mental maths.

![demonstrating responsive design](https://i.imgur.com/mZ6xCdL.png)

## Features

- Visual design
    - The site has a relatively minimal design, ensuring ease of use and avoiding superfluous content detracting from functionality.
    - It uses two synergetic and easy to read fonts.
    - It contains a simple heading and clearly visible user instructions. 
    - The submit button is clearly identifiable with a bold red colour.

![user input field and instructions](https://i.imgur.com/HpuuF6i.png)

- User input field
    - The user inputs their score each frame, consisting of 2 attempts. To signify a strike (successfully knocking over all 10 pins on the first attempt), the user types an "X" in the first input field. For a spare (successfully knocking over all 10 pins within 2 attempts), the user types a "/" in the second input field, along with the score of their first attempt. The above parameters are provided as instructions to the user to ensure proper use.
    - Upon submission, these inputs are converted to integer values and stored in an array which is subsequently used to calculate the player's total score round by round. 
    - For the special case of the 10th frame in which the player may gain an extra third attempt if they score a strike or a spare, the form's HTML is updated by a JavaScript function which allows the user to input this possible third attempt. 
    - Defensive design tools are implemented in order to assure that only valid inputs are entered at all times, namely the checkValidInput(); function which triggers before any other upon form submission.
    - Once 10 frames have been completed, the user is able to log their total score to the final column on the right of the table below. 

![scoresheet updating as the user plays](https://i.imgur.com/TryojF0.png)

- Score table
    - Basic score row
        - This row logs the individual attempt scores within each frame, doing so each time the user submits their frame score. The logScore(); function posts the raw inputs to the table as strings.
    - Cumulative score row
        - This row, sitting below the basic score row, updates whenever it is possible to calculate the player's total score. The checkScore(); function processes previous inputs, pathing to a variety of different possible functions depending on the past scoring sequence.

### Features left to implement

- In future, I would like to add an undo button that allows the user to erase their previous entry and amend it should they accidentally enter wrong data.
- I would also like to add a feature that logs scores on completion of each full game and calculates high score and mean score, allowing bowlers to track their statistics long term.

## Testing

- This application was extensively tested to ensure that the functions worked correctly and calculated the correct cumulative score. The scoring function was especially difficult to perfect due to all of the different possible permutations and sequences that required instance-specific calculations. 
- Late in development, I discovered a bug in which bowling a gutter ball (0 pins knocked over) on first attempt followed by a spare on second attempt was recognised by the checkScore(); function as a strike.
- To fix this, I adjusted the initial function in which the user input of a strike was pushed to the numerical array to the following:
``` 
if (input1 === "X") {
        frameArray.push(10, 0);
```
- This second empty value of 0 allowed the calculating functions to differentiate between strike and spare better, by fixing the position of the 10 value that signified a strike within the array of scores and thus allowing the score-incrementing functions to iterate through the array correctly.
- This game was also tested to ensure it works consistently in different browsers.

### Validator Testing

- No errors were found when passing through the official [W3 HTML validator](https://validator.w3.org/), other than those stating that table rows were missing data (which is amended by the running of scripts as the scoresheet updates).
- No errors were found when passing through the official [W3 Jigsaw CSS validator](https://jigsaw.w3.org/css-validator/validator)
- No errors were found when passing through the official [JSHint validator](https://www.jshint.com)
- The following metrics were returned:
    - There are 19 functions in this file.
    - Function with the largest signature take 1 arguments, while the median is 0.
    - Largest function has 35 statements in it, while the median is 8.
    - The most complex function has a cyclomatic complexity value of 24 while the median is 1.
- The site scores as follows when tested with Lighthouse in Chrome Devtools:

![lighthouse scores for website](https://i.imgur.com/x2wZGdP.jpg)

## Deployment

- I deployed this site via GitHub Pages. Within the GitHub repository for this project, I navigated to the Pages section of the Settings tab and selected the main branch.
- Once that is done, the deployed/live version of the site is available at https://dante-cadiz.github.io/pinalytics/

## Credits

- The advice of my Code Institute mentor Sandeep Aggarwal was invaluable in shaping my approach to building this site.

## Notes

- Late in the development process, I was advised that there was a more efficient and 'cleaner' way of calculating total score that used less lines of code - namely following the 'sliding window' paradigm to iterate through the array of scores by creating sub-arrays. 
