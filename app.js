const questions = [
    {
        difficulty: "Easy",
        question: "Which technology allows computers to learn patterns from data?",
        answers: ["Machine Learning", "HTML", "CSS", "Bluetooth"],
        correct: 0,
        hint: "Think about the branch of AI that learns from examples.",
        explanation: "Machine learning uses data and algorithms to identify patterns and improve performance on tasks."
    },
    {
        difficulty: "Easy",
        question: "What does HCI stand for?",
        answers: [
            "Human-Computer Interaction",
            "High Computing Intelligence",
            "Human Communication Interface",
            "Hybrid Computer Integration"
        ],
        correct: 0,
        hint: "It describes the relationship between people and computer systems.",
        explanation: "HCI stands for Human-Computer Interaction and focuses on how people interact with technology."
    },
    {
        difficulty: "Standard",
        question: "What is the primary purpose of an adaptive user interface?",
        answers: [
            "To change the interface based on the user or context",
            "To make every interface identical",
            "To eliminate user interaction",
            "To increase the amount of information on screen"
        ],
        correct: 0,
        hint: "Think about personalization during interaction.",
        explanation: "An adaptive user interface modifies aspects of the interaction based on information about the user, behavior, or context."
    },
    {
        difficulty: "Standard",
        question: "Which is an example of data an adaptive interface could use?",
        answers: [
            "A user's recent performance",
            "Only the computer's screen size",
            "Random numbers with no relationship to the user",
            "None of the above"
        ],
        correct: 0,
        hint: "Think about information that could reveal whether a user needs more assistance.",
        explanation: "Recent performance can help an adaptive system estimate a user's current needs and adjust the experience."
    },
    {
        difficulty: "Advanced",
        question: "Why is transparency important in an AI-adaptive interface?",
        answers: [
            "Users should understand why the system is changing their experience",
            "It prevents the interface from ever changing",
            "It removes the need for user control",
            "It guarantees that AI predictions are always correct"
        ],
        correct: 0,
        hint: "Consider how a user might feel if an interface suddenly changed without explanation.",
        explanation: "Transparency helps users understand why adaptation occurs and can support trust, awareness, and user control."
    },
    {
        difficulty: "Advanced",
        question: "What is a potential risk of an adaptive user model?",
        answers: [
            "The system may incorrectly infer the user's needs",
            "The interface can never provide assistance",
            "Adaptive systems cannot collect interaction data",
            "The user will always understand every adaptation"
        ],
        correct: 0,
        hint: "AI and adaptive systems can make incorrect assumptions.",
        explanation: "An adaptive system can misinterpret user behavior, which is why transparency and user control are important."
    }
];

let answered = 0;
let correct = 0;
let hintsUsed = 0;
let currentQuestion = 0;
let currentMode = "standard";

const modeElement = document.getElementById("mode");
const adaptationMessage = document.getElementById("adaptation-message");
const answeredElement = document.getElementById("answered");
const correctElement = document.getElementById("correct");
const hintsElement = document.getElementById("hints-used");
const difficultyElement = document.getElementById("difficulty");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const hintButton = document.getElementById("hint-button");
const hintElement = document.getElementById("hint");
const feedbackElement = document.getElementById("feedback");
const resetButton = document.getElementById("reset-button");

function chooseQuestion() {
    let availableQuestions;

    if (currentMode === "support") {
        availableQuestions = questions.filter(q => q.difficulty === "Easy");
    } else if (currentMode === "challenge") {
        availableQuestions = questions.filter(q => q.difficulty === "Advanced");
    } else {
        availableQuestions = questions.filter(q => q.difficulty === "Standard");
    }

    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
}

let activeQuestion = chooseQuestion();

function displayQuestion() {
    activeQuestion = chooseQuestion();

    difficultyElement.textContent =
        "Difficulty: " + activeQuestion.difficulty;

    questionElement.textContent =
        activeQuestion.question;

    answersElement.innerHTML = "";

    activeQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-button");

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        answersElement.appendChild(button);
    });

    hintElement.classList.add("hidden");
    feedbackElement.classList.add("hidden");
}

function checkAnswer(selectedIndex) {
    answered++;

    if (selectedIndex === activeQuestion.correct) {
        correct++;

        feedbackElement.textContent =
            "Correct! " + activeQuestion.explanation;
    } else {
        feedbackElement.textContent =
            "Not quite. " + activeQuestion.explanation;
    }

    feedbackElement.classList.remove("hidden");

    updateStatistics();
    adaptInterface();

    const buttons = document.querySelectorAll(".answer-button");
    buttons.forEach(button => button.disabled = true);

    setTimeout(() => {
        displayQuestion();
    }, 1800);
}

function updateStatistics() {
    answeredElement.textContent = answered;
    correctElement.textContent = correct;
    hintsElement.textContent = hintsUsed;
}

function adaptInterface() {
    if (answered < 2) {
        setMode("standard");
        return;
    }

    const accuracy = correct / answered;

    if (accuracy <= 0.5 || hintsUsed >= 2) {
        setMode("support");
    } else if (answered >= 3 && accuracy >= 0.8 && hintsUsed === 0) {
        setMode("challenge");
    } else {
        setMode("standard");
    }
}

function setMode(mode) {
    currentMode = mode;

    document.body.classList.remove(
        "support-mode",
        "challenge-mode"
    );

    if (mode === "support") {
        document.body.classList.add("support-mode");

        modeElement.textContent = "Support Mode";

        adaptationMessage.textContent =
            "Interface adapted: Additional support was enabled because your recent interactions indicate that more guidance may be helpful.";

        hintButton.textContent = "Show Helpful Hint";

    } else if (mode === "challenge") {
        document.body.classList.add("challenge-mode");

        modeElement.textContent = "Challenge Mode";

        adaptationMessage.textContent =
            "Interface adapted: Challenge Mode was enabled because your recent performance indicates strong understanding.";

        hintButton.textContent = "Optional Hint";

    } else {
        modeElement.textContent = "Standard Mode";

        adaptationMessage.textContent =
            "The interface is currently providing a balanced level of difficulty and assistance.";

        hintButton.textContent = "Need a Hint?";
    }
}

hintButton.addEventListener("click", () => {
    hintsUsed++;

    hintElement.textContent =
        "Hint: " + activeQuestion.hint;

    hintElement.classList.remove("hidden");

    updateStatistics();
    adaptInterface();
});

resetButton.addEventListener("click", () => {
    answered = 0;
    correct = 0;
    hintsUsed = 0;
    currentMode = "standard";

    updateStatistics();
    setMode("standard");
    displayQuestion();
});

updateStatistics();
setMode("standard");
displayQuestion();