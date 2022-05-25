// create variable that will hold all of our questions
var QuestionArray = [
    {
        'question': ' What are variables used for in JavaScript Programs?',
        'options': { 'A': 'A. Storing numbers, dates, or other values', 'B': 'B. Varying randomly', 'C': 'C. Causing high-school algebra flashbacks', 'D': 'D. None of the above' },
        'correctAnswer': 'A. Storing numbers, dates, or other values'
    },

    {
        'question': 'JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.',
        'options': { 'A': 'A. Client-side', 'B': 'B. Server-side', 'C': 'C. Local', 'D': 'D. Native' }, 'correctAnswer': 'A. Client-side'
    },

    {
        'question': 'Which of the following are capabilities of functions in JavaScript?',
        'options': { 'A': 'A. Return a value', 'B': 'B. Accept parameters and Return a value', 'C': 'C. Accept parameters', 'D': 'D. None of the above' }, 'correctAnswer': 'C. Accept parameters'
    },

    {
        'question': 'What is the correct JavaScript syntax to write "Hello World"?',
        'options': { 'A': 'A. System.out.println("Hello World")', 'B': 'B. println ("Hello World")', 'C': 'C. document.write("Hello World")', 'D': 'D. response.write("Hello World")' },
        'correctAnswer': 'C. document.write("Hello World")'
    },
    {
        'question': 'Inside which HTML element do we put the JavaScript?',
        'options': { 'A': 'A. <js>', 'B': 'B. <scripting>', 'C': 'C. <script>', 'D': 'D. <javascript>' }, 'correctAnswer': 'C. <script>'
    }];
var timerEl;
var time = 100;
var index = 0;

//create global variables for all elements that will be targeted with JS. (Dom)
var timeEl = document.querySelector("#time");
var startContainer = document.querySelector("#intro")
var startButton = document.querySelector("#start-btn");
var questionContainer = document.querySelector("#questions-container");
var endContainer = document.querySelector("#end-container");
var saveButton = document.querySelector("#saveResult");
var goBackButton = document.querySelector("#goBack")
var clearButton = document.querySelector("#clearHighscore")
var scoreContainer = document.querySelector("#score-container");
var comment = document.querySelector("#comments");
var scoreButton = document.querySelector("#scoreButton");

// when the start button is clicked: , start the timer, hide the starting container, display the question container,  display our first question and the available choices (this might need to be its own function). 

function start() {



    timeEl.textContent = time;
    time = 100;



    timerEl = setInterval(function () {
        // drop our time by 1
        time--;
        timeEl.textContent = time;
        if (time <= 0) {
            clearInterval(timerEl);
            showResults();
            document.querySelector("#resultComment").textContent = `Time's up! Please enter your initial to save your score.`
        } else if (index >= QuestionArray.length) {
            clearInterval(timerEl);
            showResults();
            document.querySelector("#resultComment").textContent = `Well done! Please enter your initial to save your score.`
        }
    }, 1000)

    // look into classList.add and remove
    startContainer.classList.add('hidden')
    questionContainer.classList.remove('hidden');
    showQuiz();
    ;

    //call function that displays question
}
function showQuiz() {

    if (index < QuestionArray.length) {
        document.querySelector("#question").textContent = QuestionArray[index].question;
        document.querySelector("#optionA").textContent = QuestionArray[index].options.A;
        document.querySelector("#optionB").textContent = QuestionArray[index].options.B;
        document.querySelector("#optionC").textContent = QuestionArray[index].options.C;
        document.querySelector("#optionD").textContent = QuestionArray[index].options.D;
        comment.textContent = "";
    }

}
//check whether it's the correct option
function checkAnswer(event) {
    event.preventDefault();
    var userAnswer = event.target.textContent;

    //if the correct answer chose, show the next question
    if (userAnswer == QuestionArray[index].correctAnswer) {
        comment.textContent = `You are right!`;

    } else {
        comment.textContent = 'Wrong';
        time -= 10;
    }

    index++;
    setTimeout(showQuiz, 1500);

}

function showResults() {

    questionContainer.classList.add('hidden');
    endContainer.classList.remove('hidden');
    var InitialField = document.getElementById("initial");
    InitialField.value = "";
    document.querySelector("#score").textContent = `Score: ${time}`;
}

function saveResult(event) {
    event.preventDefault();
    initial = document.getElementById("initial").value;
    localStorage.setItem("initial", initial);
    localStorage.setItem("time", time);



    showHighscore();
}

function showHighscore() {

    scoreContainer.classList.remove('hidden');
    endContainer.classList.add('hidden');
    var initial = localStorage.getItem("initial");
    var time = localStorage.getItem("time");

    document.querySelector("#scoreList").innerHTML += `<li class="list-group-item">${initial}:  ${time}</li>`;



};

function goBack() {
    index = 0;
    document.querySelector("#time").textContent = `Time: 100`;
    startContainer.classList.remove('hidden');
    scoreContainer.classList.add('hidden');
}


function clearHighscore() {
    document.querySelector("#scoreList").innerHTML = '';
}

function showScore() {
    startContainer.classList.add('hidden');
    questionContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    endContainer.classList.add('hidden');
}



startButton.addEventListener("click", start)
saveButton.addEventListener("click", saveResult)
goBackButton.addEventListener("click", goBack)
clearButton.addEventListener("click", clearHighscore)
scoreButton.addEventListener("click", showScore);