var start = document.querySelector("#start");
var timeEl = document.querySelector(".time");
var content = document.querySelector("#content");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var firstQuestion = document.getElementById("1");
var secondQuestion = document.getElementById("2");
var thridQuestion = document.getElementById("3");
var fourthQuestion = document.getElementById("4");
var score = document.getElementById("score");
var finalScore = document.getElementById("final-score");
var answer = document.querySelectorAll(".questions");
var answerPrint = document.getElementById("answer");
var submitBtn = document.getElementById("submit");
var initialsInput = document.getElementById("initials-text");

var secondsLeft = 60;

//Array of questions and answers
const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        firstQuestion: "1. strings",
        secondQuestion: "2. booleans",
        thridQuestion: "3. alerts",
        fourthQuestion: "3. numbers",
        correctAnswer: thridQuestion
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        firstQuestion: "1. numbers and strings",
        secondQuestion: "2. other arrays",
        thridQuestion: "3. booleans",
        fourthQuestion: "4. all of the above",
        correctAnswer: choice
    },
    {
        question: "The condition in an if / else statement is enclosed within _____.",
        firstQuestion: "1. quotes",
        secondQuestion: "2. curly brackets",
        thridQuestion: "3. parentheses",
        fourthQuestion: "4. square brackets",
        correctAnswer: thridQuestion
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        firstQuestion: "1. commas",
        secondQuestion: "2. curly brackets",
        thridQuestion: "3. quotes",
        fourthQuestion: "4. parentheses",
        correctAnswer: thridQuestion
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        firstQuestion: "1. Javascript",
        secondQuestion: "2. terminal/bash",
        thridQuestion: "3. for loops",
        fourthQuestion: "4. console.log",
        correctAnswer: fourthQuestion
    }
]

var i = 0;
var scoreCount = 0
let q = questions[i];

// Rendering questions and answers
function renderQuestions() {
    question.textContent = q.question;
    firstQuestion.textContent = q.firstQuestion;
    secondQuestion.textContent = q.secondQuestion;
    thridQuestion.textContent = q.thridQuestion;
    fourthQuestion.textContent = q.fourthQuestion;
}

// Convert answers into an array
let answerArr = Array.from(answer)

answerArr.forEach(answer => answer.addEventListener("click", checkAnswer));

// Function to add scores or deducte time depending on correct answer
function checkAnswer(event) {
    var correct = q.correctAnswer;
    console.log(correct);
    if (event.target == correct) {
        answerPrint.textContent = "correct";
        scoreCount = scoreCount + 10;
    } else {
        answerPrint.textContent = "incorrect";
        secondsLeft = secondsLeft - 10;
        timeEl.textContent = secondsLeft + " seconds left";   
        }
    i++;
    if (i >= questions.length) {
        endQuiz();
    }
    else {
        q = questions[i]
        // The JavaScript was loading too quickly, matching the current question to
        // next answer
        setTimeout(renderQuestions, 200)
    }
};

var scores = JSON.parse(localStorage.getItem('scores')) || [];

// Stores the scores as an array in local storage

if (initialsInput !== "") 
    submitBtn.addEventListener("click", function(event) {
        // Redirects to the highscore page
        location.href = "highscore.html";
        event.preventDefault();
        var scoreText = initialsInput.value + " " + scoreCount;
        scores.push(scoreText);
        localStorage.setItem('scores', JSON.stringify(scores))
    });

// Displays the final score and stops the time after the last question has been answered    
function endQuiz() {
    quiz.style.display = "none";
    score.style.display = "block";
    finalScore.textContent = "Your final score is " + scoreCount;
    clearInterval(timerInterval);
}

var timerInterval;

function setTime() {
        timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left";
        if (secondsLeft === 0) {
            endQuiz();
        }

    }, 1000);
};

start.addEventListener("click", startQuiz);

function startQuiz() {

    renderQuestions();

    setTime();

};