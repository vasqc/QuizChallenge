//Questions for quiz
var questions = [
    {
        title: "What does HTML stand for?",
        choices: ["Hypertext Markup Language", "Hungry Turtles Make Lunch", "Hats Tips Musty Lulu"],
        answer: "Hypertext Markup Language"
    },
    {
        title: "What does CSS stand for?",
        choices: ["Cats Snakes Surprise!", "Cascading Style Sheets", "Casper Security Systems"],
        answer: "Cascading Style Sheets"
    },
    {
        title: "A set of instructions that can be performed with or without a computer?",
        choices: ["Bug", "Loop", "Algorithm"],
        answer: "Algorithm"
    },
    {
        title: "What two words has every programmer learned to code first?",
        choices: ["Hello, World", "Run,Now", "Hello, Gorgeous"],
        answer: "Hello, World."
    },
    {
        title: "Do you LOVE coding?",
        choices: ["Yes", "No", "Why did I do this to myself?"],
        answer: "Yes"
    }
];

var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var startBtn = document.getElementById("start");


function startQuiz() {
    //go to the next page
    var startScreenEl = document.getElementById("info");
    startScreenEl.setAttribute("class", "next");


    questionsEl.removeAttribute("class");

    // start the quiz and start timer
    timerId = setInterval(clockTick, 1000);

    // show starting time
    timerEl.textContent = time;

    getQuestions();

};
function getQuestions() {
    
    var currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    // clear out any old question choices
    choicesEl.innerHTML = "";

    // get new choices
    currentQuestion.choices.forEach(function (choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;
        choiceNode.onclick = questionClick;
        choicesEl.appendChild(choiceNode);
    });
};
function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 20;
if (time < 0) {
            time = 0;
            quizEnd();
        }
        timerEl.textContent = time;

        currentQuestionIndex++;

//this is if we run out of questions
        if (currentQuestionIndex === questions.length) {
            quizEnd();
        } else {
            getQuestions();
        }
    }

}
//stop the quiz
function quizEnd() {
    clearInterval(timerId);

    questionsEl.setAttribute("class", "hide");
}
// make timer work
function clockTick() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    } else {
        getQuestions();
    }
}



startBtn.onclick = startQuiz();
