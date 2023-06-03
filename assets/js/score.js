var highscores = document.getElementById("highscores");
var clearScores = document.getElementById("clear");

var scores = [];

window.onload = function() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));
        
    if (storedScores !== null) {
        scores = storedScores;
        renderScores();
    }
}

// function rendering items in the score list as <li> elements
function renderScores() {

  highscores.innerHTML = "";

   for (var i = 0; i < scores.length; i++) {
    var score = scores[i];

    var li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);

    highscores.appendChild(li);
  }
 }

clearScores.addEventListener("click", function() {
    highscores.innerHTML = "";
    window.localStorage.clear();
})