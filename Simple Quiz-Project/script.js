const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { Text: "Shark", correct: false },
            { Text: "Blue whale", correct: true },
            { Text: "Elephant", correct: false },
            { Text: "Giraffe", correct: false },
        ],
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { Text: "Vatican City", correct: true },
            { Text: "Ethiopia", correct: false },
            { Text: "Canada", correct: false },
            { Text: "Australia", correct: false },
        ],
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { Text: "Shark", correct: false },
            { Text: "Gobi", correct: false },
            { Text: "Sahara", correct: false },
            { Text: "Antarctica", correct: true },
        ],
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { Text: "Kenya", correct: false },
            { Text: "Australia", correct: true },
            { Text: "Asia", correct: false },
            { Text: "Africa", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none"; // Hide Next button until answer is selected
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if (isCorrect) {
        selectedbtn.classList.add("correct");
        score++;
    } else {
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons after selection
    });
    nextButton.style.display = "block"; // Show Next button after answer is selected
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore(); // Fixed typo here
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
