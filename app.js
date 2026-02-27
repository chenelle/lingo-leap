// --- Mock Data ---
const QUIZ_DATA = [
    {
        id: 1,
        type: "reading",
        tag: "IELTS Reading",
        question: "Which of the following best describes the main idea of the passage regarding global warming?",
        options: [
            { key: "A", text: "It is solely caused by industrial activities.", isCorrect: false },
            { key: "B", text: "It serves as a natural cycle of the earth's climate.", isCorrect: false },
            { key: "C", text: "It is a complex phenomenon influenced by multiple factors.", isCorrect: true },
            { key: "D", text: "Its effects are negligible on sea levels.", isCorrect: false }
        ]
    },
    {
        id: 2,
        type: "vocabulary",
        tag: "Vocabulary",
        question: "Select the synonym for: 'Gregarious'",
        options: [
            { key: "A", text: "New", isCorrect: false },
            { key: "B", text: "Sociable", isCorrect: true },
            { key: "C", text: "Solitary", isCorrect: false },
            { key: "D", text: "Hostile", isCorrect: false }
        ]
    },
    {
        id: 3,
        type: "grammar",
        tag: "IELTS Writing",
        question: "Choose the correct sentence structure:",
        options: [
            { key: "A", text: "Despite he was tired, he continued working.", isCorrect: false },
            { key: "B", text: "Although he was tired, but he continued working.", isCorrect: false },
            { key: "C", text: "Although he was tired, he continued working.", isCorrect: true },
            { key: "D", text: "Despite of his tiredness, he continued working.", isCorrect: false }
        ]
    },
    {
        id: 4,
        type: "listening",
        tag: "Listening Part 1",
        question: "What time does the train to London depart?",
        options: [
            { key: "A", text: "10:15 AM", isCorrect: false },
            { key: "B", text: "10:30 AM", isCorrect: true },
            { key: "C", text: "10:45 AM", isCorrect: false },
            { key: "D", text: "11:00 AM", isCorrect: false }
        ]
    },
    {
        id: 5,
        type: "vocabulary",
        tag: "Advanced Vocab",
        question: "Which word best completes the sentence: 'The evidence was ________, leaving no doubt about the verdict.'",
        options: [
            { key: "A", text: "Ambiguous", isCorrect: false },
            { key: "B", text: "Irrefutable", isCorrect: true },
            { key: "C", text: "Tentative", isCorrect: false },
            { key: "D", text: "Circumstantial", isCorrect: false }
        ]
    }
];

// --- State ---
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;
let isAnswered = false;

// --- DOM Elements ---
const progressBar = document.getElementById('quiz-progress-bar');
const scoreDisplay = document.getElementById('quiz-score');
const questionCard = document.getElementById('question-card');
const resultsCard = document.getElementById('results-card');
const questionTag = document.getElementById('question-tag');
const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const checkBtn = document.getElementById('check-btn');
const skipBtn = document.getElementById('skip-btn');
const quizFooter = document.getElementById('quiz-footer');

// --- Initialization ---
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    updateStats();
    renderQuestion();
}

// --- Render Functions ---
function renderQuestion() {
    const question = QUIZ_DATA[currentQuestionIndex];

    // Reset State
    selectedOptionIndex = null;
    isAnswered = false;
    checkBtn.textContent = "Check Answer";
    checkBtn.disabled = true; // Disable until selection
    checkBtn.classList.remove('btn-success', 'btn-error');
    checkBtn.style.background = "";
    checkBtn.style.color = "";

    // Update Progress
    const progress = (currentQuestionIndex / QUIZ_DATA.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Update Content
    questionTag.textContent = question.tag;
    questionText.textContent = question.question;

    // Render Options
    optionsGrid.innerHTML = '';
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <span class="option-key">${option.key}</span>
            ${option.text}
        `;
        btn.onclick = () => handleOptionSelect(index);
        optionsGrid.appendChild(btn);
    });
}

function handleOptionSelect(index) {
    if (isAnswered) return; // Prevent changing after check

    selectedOptionIndex = index;

    // Update UI selection
    const buttons = optionsGrid.children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('selected');
    }
    buttons[index].classList.add('selected');

    // Enable Check Button
    checkBtn.disabled = false;
}

function checkAnswer() {
    if (isAnswered) {
        // If already answered, this button acts as "Next"
        nextQuestion();
        return;
    }

    isAnswered = true;
    const question = QUIZ_DATA[currentQuestionIndex];
    const selectedOption = question.options[selectedOptionIndex];
    const buttons = optionsGrid.children;

    // Show Correct/Wrong Styles
    if (selectedOption.isCorrect) {
        // --- CORRECT ---
        buttons[selectedOptionIndex].classList.add('correct', 'pop'); // Add Pop Animation
        const key = buttons[selectedOptionIndex].querySelector('.option-key');
        key.style.background = '#22C55E';
        key.style.color = '#fff';
        key.style.borderColor = '#22C55E';
        score++;

        checkBtn.textContent = "Correct!";
        checkBtn.classList.add('btn-success');
        checkBtn.style.background = "#22C55E";
        checkBtn.style.color = "#fff";

        // Auto-advance after 1.5s
        setTimeout(() => {
            nextQuestion();
        }, 1500);

    } else {
        // --- WRONG ---
        buttons[selectedOptionIndex].classList.add('wrong', 'shake'); // Add Shake Animation
        const key = buttons[selectedOptionIndex].querySelector('.option-key');
        key.style.background = '#EF4444';
        key.style.color = '#fff';
        key.style.borderColor = '#EF4444';

        checkBtn.textContent = "Wrong! Next →";
        checkBtn.style.background = "#EF4444";
        checkBtn.style.color = "#fff";

        // Highlight correct answer
        const correctIndex = question.options.findIndex(o => o.isCorrect);
        buttons[correctIndex].classList.add('correct');
    }

    updateStats();
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < QUIZ_DATA.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionCard.style.display = 'none';
    quizFooter.style.display = 'none';
    resultsCard.style.display = 'block';

    // Update Result Text
    document.getElementById('final-score').textContent = `${score}/${QUIZ_DATA.length}`;
    document.getElementById('final-xp').textContent = score * 50;

    // Fill Progress Bar
    progressBar.style.width = '100%';
}

function updateStats() {
    scoreDisplay.textContent = `💎 ${score * 50} XP`;
}

// --- Event Listeners ---
checkBtn.addEventListener('click', checkAnswer);
skipBtn.addEventListener('click', nextQuestion);

// Start
initQuiz();

// --- Customer Acquisition Forms Logic ---
(function () {
    const scrollPopup = document.getElementById('scroll-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const footerForm = document.getElementById('footer-newsletter-form');
    const popupForm = document.getElementById('popup-newsletter-form');

    // 1. Scroll Popup Logic (75% threshold)
    if (scrollPopup) {
        // Check if already shown this session
        const hasSeenPopup = sessionStorage.getItem('hasSeenSignupPopup');

        if (!hasSeenPopup) {
            const handleScroll = () => {
                const scrollPosition = window.scrollY || window.pageYOffset;
                const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

                // If the page is too short to scroll, don't show the scroll popup
                if (totalHeight <= 0) return;

                const scrollPercentage = Math.round((scrollPosition / totalHeight) * 100);

                if (scrollPercentage >= 75) {
                    scrollPopup.classList.add('show');
                    sessionStorage.setItem('hasSeenSignupPopup', 'true');
                    window.removeEventListener('scroll', handleScroll);
                }
            };

            window.addEventListener('scroll', handleScroll);
        }

        // Close Popup
        closePopupBtn.addEventListener('click', () => {
            scrollPopup.classList.remove('show');
        });

        // Close on outside click
        scrollPopup.addEventListener('click', (e) => {
            if (e.target === scrollPopup) {
                scrollPopup.classList.remove('show');
            }
        });
    }

    // 2. Form Submission Handler
    async function handleNewsletterSubmit(e, formType) {
        e.preventDefault();

        const nameInput = document.getElementById(`${formType}-name`).value;
        const emailInput = document.getElementById(`${formType}-email`).value;
        const submitBtn = document.getElementById(`${formType}-submit-btn`);
        const messageDiv = document.getElementById(`${formType}-form-message`);

        // Reset message
        messageDiv.style.display = 'none';
        messageDiv.className = '';

        // Loading State
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: nameInput, email: emailInput })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Signup failed');
            }

            // Success State
            messageDiv.textContent = 'Awesome! Check your inbox for the quiz link. 🚀';
            messageDiv.className = 'msg-success';
            messageDiv.style.display = 'block';
            submitBtn.innerText = 'Sent!';

            // Clear form
            document.getElementById(`${formType}-name`).value = '';
            document.getElementById(`${formType}-email`).value = '';

            // Auto close popup on success after 3 seconds
            if (formType === 'popup') {
                setTimeout(() => {
                    scrollPopup.style.display = 'none';
                }, 3000);
            }

        } catch (error) {
            console.error('Newsletter Signup Error:', error);
            messageDiv.textContent = error.message || 'Something went wrong. Please try again.';
            messageDiv.className = 'msg-error';
            messageDiv.style.display = 'block';
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    }

    if (footerForm) {
        footerForm.addEventListener('submit', (e) => handleNewsletterSubmit(e, 'footer'));
    }

    if (popupForm) {
        popupForm.addEventListener('submit', (e) => handleNewsletterSubmit(e, 'popup'));
    }
})();
