# Pinalytics

Pinalytics is an interactive bowling scorecard that records and increments scores frame by frame in accordance with the official rule set of 10 pin bowling. 

## Features

- User input field
    - The user inputs their score each frame, consisting of 2 attempts. To signify a strike (successfully knocking over all 10 pins on the first attempt), the user types an "X" in the first input field. For a spare (successfully knocking over all 10 pins within 2 attempts), the user types a "/" in the second input field, along with the score of their first attempt. 
    - These inputs are converted to integer values and stored in an array which is subsequently used to calculate the player's total score round by round. 
    - For the special case of the 10th frame in which the player may gain an extra third attempt if they score a strike or a spare, the form's HTML is updated by a JavaScript function which allows the user to input this possible third attempt. 
    - Defensive design tools are implemented in order to assure that only valid inputs are entered at all times, namely the checkValidInput(); function which triggers before any other upon form submission.
    - Once 10 frames have been completed, the user is able to log their total score to the final column on the right of the table below. 

- Score table
    - Basic score row
        - This row logs the individual attempt scores within each frame, doing so each time the user submits their frame score. The logScore(); function posts the raw inputs to the table as strings.
    - Cumulative score row
        - This row, sitting below the basic score row, updates whenever it is possible to calculate the player's total score. The checkScore(); function processes previous inputs, pathing to a variety of different possible functions depending on the past scoring sequence.

## Testing

- This application was extensively tested to ensure that the functions worked correctly and calculated the correct cumulative score. The scoring function was especially difficult to perfect due to all of the different possible permutations and sequences that required instance-specific calculations. 
- Late in development, I discovered a bug in which bowling a gutter ball (0 pins knocked over) on first attempt followed by a spare on second attempt was recognised by the checkScore(); function as a strike.
- To fix this, I adjusted the initial function in which the user input of a strike was pushed to the numerical array to the following:
``` 
if (input1 === "X") {
        frameArray.push(10, 0);
```
- This second empty value of 0 allowed the calculating functions to differentiate between strike and spare better, by fixing the position of the 10 value that signified a strike.


## Deployment

- I deployed this site via GitHub Pages

## Credits

