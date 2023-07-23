let list = document.querySelector(".quiz-list");
let currentQuestion = 0;
let score = 0;

function fetchQuestion() {
  list.innerHTML = `
  <h1>Please wait...</h1>
  <div id="loader"></div>`;

  fetch("https://opentdb.com/api.php?amount=15&category=18")
    .then((response) => response.json())
    .then((data) => {
      let question = data.results[currentQuestion].question;
      let answers = data.results[currentQuestion].incorrect_answers;
      let correctAnswer = data.results[currentQuestion].correct_answer;

      let listItem = document.createElement("ul");
      listItem.innerHTML = `
      <h1 class="currenQuestion">15/${currentQuestion + 1}</h1>
      <h1>${question}</h1>
      `;

      list.style.padding = "40px 40px";
      list.style.borderRadius = "50px";
      list.style.boxShadow = "20px 20px 60px #bebebe, -20px -20px 60px #ffffff";

      answers.forEach((answer) => {
        listItem.innerHTML += `<li><button>${answer}</button></li>`;
      });

      listItem.innerHTML += `<li><button>${correctAnswer}</button></li>`;

      list.innerHTML = "";
      list.appendChild(listItem);

      let answerButtons = document.querySelectorAll("button");
      answerButtons.forEach((button) => {
        button.addEventListener("click", () => {
          currentQuestion++;

          if (button.textContent === correctAnswer) {
            score++;
          }

          list.innerHTML = `<div id="loader"></div>`;

          if (currentQuestion === data.results.length) {
            showTestFinishedMessage();
          } else {
            fetchQuestion();
          }
        });
      });
    });
}

function showTestFinishedMessage() {
  let listItem = document.createElement("ul");
  listItem.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <div class="restart">
  <h1>Test finished, your score: ${score}</h1>
  <button id="restartButton">Restart <i class="bi bi-arrow-clockwise"></i></button>
  </div>`;

  list.innerHTML = "";
  list.appendChild(listItem);


  let restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    fetchQuestion();
  });
}

fetchQuestion();
