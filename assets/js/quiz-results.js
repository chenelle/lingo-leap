// Recommendations based on score (from free-quiz.js)
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

// Strengths and weaknesses based on score
const ANALYSIS = {
    4.5: {
        strengths: ["Basic communication skills", "Determination to improve"],
        weaknesses: ["Core vocabulary gaps", "Basic grammar structures", "Sentence formation"]
    },
    5.0: {
        strengths: ["Simple sentence construction", "Basic vocabulary knowledge"],
        weaknesses: ["Grammar accuracy", "Complex sentence structures", "Academic vocabulary"]
    },
    5.5: {
        strengths: ["General communication", "Everyday vocabulary"],
        weaknesses: ["Formal writing style", "Advanced grammar", "Reading comprehension speed"]
    },
    6.5: {
        strengths: ["Grammar fundamentals", "Good vocabulary range"],
        weaknesses: ["Idioms and collocations", "Advanced sentence structures", "Writing cohesion"]
    },
    7.5: {
        strengths: ["Strong vocabulary", "Grammar accuracy", "Reading comprehension"],
        weaknesses: ["Complex grammatical structures", "Formal academic style", "Speaking fluency"]
    },
    8.5: {
        strengths: ["Excellent grammar mastery", "Wide vocabulary range", "Strong comprehension"],
        weaknesses: ["Minor nuances in style", "Perfect consistency under pressure"]
    }
};

// Load score from localStorage
const scoreData = JSON.parse(localStorage.getItem('quizScore'));

if (!scoreData) {
    // Redirect if no score found
    window.location.href = 'free-quiz.html';
} else {
    renderResults(scoreData);
}

function renderResults(score) {
    // Display band score
    document.getElementById('band-score').innerText = score.band;
    document.getElementById('band-score').style.color = score.color;
    document.getElementById('band-descriptor').innerText = `${score.level} (CLB ${score.clb})`;
    document.getElementById('score-breakdown').innerHTML =
        `You answered <strong>${score.correctAnswers} out of 5</strong> questions correctly!`;

    // Display strengths
    const analysis = ANALYSIS[score.band];
    const strengthsList = document.getElementById('strengths-list');
    strengthsList.innerHTML = '';
    analysis.strengths.forEach(strength => {
        const li = document.createElement('li');
        li.innerText = strength;
        strengthsList.appendChild(li);
    });

    // Display weaknesses
    const weaknessesList = document.getElementById('weaknesses-list');
    weaknessesList.innerHTML = '';
    analysis.weaknesses.forEach(weakness => {
        const li = document.createElement('li');
        li.innerText = weakness;
        weaknessesList.appendChild(li);
    });

    // Display recommendations
    const recommendations = RECOMMENDATIONS[score.band];
    const recList = document.getElementById('rec-list');
    recList.innerHTML = '';
    recommendations.forEach(rec => {
        const recDiv = document.createElement('div');
        recDiv.className = 'rec-item';
        recDiv.style.cssText = 'display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; background: #F9FAFB; border-radius: 12px; border: 2px solid #E5E7EB;';
        recDiv.innerHTML = `
            <div class="icon-box" style="font-size: 3rem; min-width: 60px; text-align: center;">${rec.icon}</div>
            <div>
                <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${rec.title}</h4>
                <p style="color: var(--text-muted); margin: 0;">${rec.desc}</p>
            </div>
        `;
        recList.appendChild(recDiv);
    });
}
