// Question Bank - Based on lead_magnet_plan.md
const QUESTIONS = [
    {
        id: 1,
        question: "Choose the word that best completes the sentence: 'I need to _____ my passport before I travel.'",
        options: [
            { text: "Renew", isCorrect: true },
            { text: "Repair", isCorrect: false },
            { text: "Replace", isCorrect: false },
            { text: "Return", isCorrect: false }
        ],
        passage: null
    },
    {
        id: 2,
        question: "Which sentence is grammatically correct?",
        options: [
            { text: "I have seen that movie yesterday.", isCorrect: false },
            { text: "I saw that movie yesterday.", isCorrect: true },
            { text: "I have saw that movie yesterday.", isCorrect: false },
            { text: "I am seeing that movie yesterday.", isCorrect: false }
        ],
        passage: null
    },
    {
        id: 3,
        question: "What is the primary purpose of this policy?",
        options: [
            { text: "To punish employees who miss deadlines.", isCorrect: false },
            { text: "To ensure timely tracking of employee performance.", isCorrect: true },
            { text: "To reduce the workload of managers.", isCorrect: false },
            { text: "To replace annual performance reviews.", isCorrect: false }
        ],
        passage: "The new policy requires all employees to submit monthly reports by the first Friday of each month. Failure to comply may result in delayed performance reviews."
    },
    {
        id: 4,
        question: "Which phrase is most appropriate in formal academic writing?",
        options: [
            { text: "The study makes clear that climate change is accelerating.", isCorrect: false },
            { text: "The study demonstrates that climate change is accelerating.", isCorrect: true },
            { text: "The study shows off that climate change is accelerating.", isCorrect: false },
            { text: "The study points out that climate change is accelerating.", isCorrect: false }
        ],
        passage: null
    },
    {
        id: 5,
        question: "Choose the most grammatically accurate sentence:",
        options: [
            { text: "If I would have known about the meeting, I would attend it.", isCorrect: false },
            { text: "Had I known about the meeting, I would have attended.", isCorrect: true },
            { text: "If I had known about the meeting, I would attend it.", isCorrect: false },
            { text: "If I have known about the meeting, I would have attended.", isCorrect: false }
        ],
        passage: null
    }
];

// Band Score Mapping
const BAND_MAP = {
    0: { band: 4.5, clb: "4-5", level: "Limited User", color: "#FCA5A5" },
    1: { band: 5.0, clb: "5-6", level: "Modest User", color: "#FBBF24" },
    2: { band: 5.5, clb: "6", level: "Modest User", color: "#FBBF24" },
    3: { band: 6.5, clb: "7", level: "Competent User", color: "#60A5FA" },
    4: { band: 7.5, clb: "8-9", level: "Good User", color: "#34D399" },
    5: { band: 8.5, clb: "10+", level: "Very Good User", color: "#10B981" }
};

// Recommendations based on score
const RECOMMENDATIONS = {
    4.5: [
        { icon: "📚", title: "Build Core Vocabulary", desc: "Focus on 1000 most common IELTS words" },
        { icon: "✍️", title: "Grammar Foundations", desc: "Master present/past tenses" }
    ],
    5.0: [
        { icon: "📖", title: "Reading Practice", desc: "Read short articles daily" },
        { icon: "🎧", title: "Listening Skills", desc: "Watch English videos with subtitles" }
    ],
    5.5: [
        { icon: "💬", title: "Speaking Confidence", desc: "Practice daily conversations" },
        { icon: "📝", title: "Writing Structure", desc: "Learn paragraph organization" }
    ],
    6.5: [
        { icon: "📖", title: "Writing Task 2", desc: "Practice academic essays" },
        { icon: "🎯", title: "Advanced Vocabulary", desc: "Learn idioms and phrasal verbs" }
    ],
    7.5: [
        { icon: "🎤", title: "Speaking Fluency", desc: "Record yourself speaking for 2 minutes" },
        { icon: "📚", title: "Complex Grammar", desc: "Master conditionals and passive voice" }
    ],
    8.5: [
        { icon: "🌟", title: "Nuance & Style", desc: "Perfect your academic tone" },
        { icon: "🎯", title: "Test Strategy", desc: "Focus on time management" }
    ]
};

// State
let currentQuestionIndex = 0;
let userAnswers = [];
let selectedOptionIndex = null;

// DOM Elements
const quizIntro = document.getElementById('quiz-intro');
const quizQuestions = document.getElementById('quiz-questions');
const emailGateModal = document.getElementById('email-gate-modal');
const progressBar = document.getElementById('quiz-progress-bar');
const progressFill = document.getElementById('progress-fill');
const questionCounter = document.getElementById('question-counter');
const currentQNum = document.getElementById('current-q-num');
const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const passageBox = document.getElementById('passage-box');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const emailForm = document.getElementById('email-form');
const startQuizBtn = document.getElementById('start-quiz-btn');

// Start Quiz
startQuizBtn.addEventListener('click', () => {
    quizIntro.classList.remove('active');
    quizQuestions.classList.add('active');
    progressBar.style.display = 'block';
    renderQuestion();
});

// Render Question
function renderQuestion() {
    const q = QUESTIONS[currentQuestionIndex];

    // Update progress
    const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
    progressFill.style.width = `${progress}%`;
    questionCounter.innerText = `${currentQuestionIndex + 1} / ${QUESTIONS.length}`;
    currentQNum.innerText = currentQuestionIndex + 1;

    // Display passage if exists
    if (q.passage) {
        passageBox.style.display = 'block';
        passageBox.innerHTML = `<p><em>${q.passage}</em></p>`;
    } else {
        passageBox.style.display = 'none';
    }

    // Display question
    questionText.innerText = q.question;

    // Render options
    optionsGrid.innerHTML = '';
    q.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.innerText = option.text;

        // Restore previous selection
        if (userAnswers[currentQuestionIndex] === index) {
            optionDiv.classList.add('selected');
            selectedOptionIndex = index;
            nextBtn.disabled = false;
        }

        optionDiv.addEventListener('click', () => selectOption(index));
        optionsGrid.appendChild(optionDiv);
    });

    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    if (selectedOptionIndex === null && !userAnswers[currentQuestionIndex]) {
        nextBtn.disabled = true;
    }
}

// Select Option
function selectOption(index) {
    selectedOptionIndex = index;
    userAnswers[currentQuestionIndex] = index;

    // Update UI
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
        opt.classList.toggle('selected', i === index);
    });

    nextBtn.disabled = false;
}

// Navigation
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        selectedOptionIndex = null;
        renderQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
        currentQuestionIndex++;
        selectedOptionIndex = null;
        renderQuestion();
    } else {
        // Quiz complete → show email gate
        showEmailGate();
    }
});

// Show Email Gate
function showEmailGate() {
    quizQuestions.classList.remove('active');
    emailGateModal.classList.add('active');
}

// Calculate Score
function calculateScore() {
    let correctAnswers = 0;
    QUESTIONS.forEach((q, i) => {
        const correctIndex = q.options.findIndex(opt => opt.isCorrect);
        if (userAnswers[i] === correctIndex) {
            correctAnswers++;
        }
    });

    const scoreData = BAND_MAP[correctAnswers];
    return {
        correctAnswers,
        ...scoreData
    };
}

// Email Form Submission
emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    const name = document.getElementById('name-input').value;
    const submitBtn = document.getElementById('submit-email-btn');

    const score = calculateScore();

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerText = 'Submitting...';

    try {
        // Call serverless API to submit to Sender.net
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                name: name,
                score: score.correctAnswers,
                bandLevel: score.band
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Subscription failed');
        }

        const result = await response.json();
        console.log('Successfully subscribed:', result);

        // Store score data locally for results page
        localStorage.setItem('quizScore', JSON.stringify(score));
        localStorage.setItem('userEmail', email);

        // Redirect to results page
        window.location.href = 'quiz-results.html';

    } catch (error) {
        console.error('Submission error:', error);
        alert('Something went wrong. Please try again.');
        submitBtn.disabled = false;
        submitBtn.innerText = 'View My Results →';
    }
});
