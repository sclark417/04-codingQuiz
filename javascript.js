var questions = [
  {
    title: "What does HTML stand for?",
    choices: [
      "Hydro Tool marketing language( )",
      "Hyper Time Manager Lobby( )",
      "Hyper Text Markup language( )",
      "Harry Time Mark Long( )",
    ],
    answer: "Hyper Text Markup Language( )",
  },
  {
    title: " What does CSS stand for?",
    choices: [
      "Category Style Sheet( )",
      "Cascading Style Sheet( )",
      "Cascading Sheet Style( )",
      "None of the above.",
    ],
    answer: "Cascading Style Sheet( )",
  },

  {
    title:
      "Which of the following function of String object combines the text of two strings and returns a new string?",
    choices: ["add( )", "concat( )", " merge( )", "append( )"],
    answer: "concat( )",
  },
];

//setting the numerical variables for the functions.. scores and timers..
var score = 0;
var currentQuestion = 0;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {
  timeLeft = 40;
  document.getElementById("timeLeft").innerHTML = timeLeft;

  timer = setInterval(function () {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  next();
}

//stop the timer to end the game
function endGame() {
  clearInterval(timer);

  var quizContent =
    `
<h2>Game over!</h2>
<h3>You got a ` +
    score +
    ` /100!</h3>
<h3>That means you got ` +
    score / 20 +
    ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>;`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById("name").value);
  getScore();
}

function getScore() {
  var quizContent = `


<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  resetGame();
}

//reset the game
function resetGame() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;

  var quizContent = `
<h1>
    Coding Quiz!
</h1>
<h3>
    Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}
var choicesIndex = 0;
//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
  timeLeft -= 15;
  choicesIndex++;
  currentQuestion++;
  next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
  score += 20;
  choicesIndex++;
  currentQuestion++;
  next();
}

//loops through the questions
function next() {
  if (currentQuestion > questions.length - 1) {
    endGame();
    return;
  }

  var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>";

  for (
    var buttonLoop = 0;
    buttonLoop < questions[currentQuestion].choices.length;
    buttonLoop++
  ) {
    var buttonCode = '<button onclick="[ANS]">[CHOICE]</button>';
    buttonCode = buttonCode.replace(
      "[CHOICE]",
      questions[currentQuestion].choices[buttonLoop]
    );
    if (
      questions[currentQuestion].choices[buttonLoop] ==
      questions[currentQuestion].answer
    ) {
      console.log(
        questions[currentQuestion].choices[buttonLoop],
        questions[currentQuestion].answer
      );
      buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode;
    console.log(choicesIndex);
  }

  document.getElementById("quizBody").innerHTML = quizContent;
}
