// This is a simplified game engine. A production version would be more robust.
document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;

    const gameId = gameContainer.dataset.gameId;
    const gameType = gameContainer.dataset.gameType;
    const token = localStorage.getItem('accessToken');

    let questions = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let score = 0;
    let timerInterval;
    let timeElapsed = 0;

    const elements = {
        timer: document.getElementById('timer'),
        score: document.getElementById('score'),
        questionCounter: document.getElementById('question-counter'),
        gameArea: document.getElementById('game-area'),
        nextBtn: document.getElementById('next-question-btn'),
        submitBtn: document.getElementById('submit-game-btn'),
    };

    function startTimer() {
        timerInterval = setInterval(() => {
            timeElapsed++;
            const minutes = Math.floor(timeElapsed / 60).toString().padStart(2, '0');
            const seconds = (timeElapsed % 60).toString().padStart(2, '0');
            elements.timer.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }

    function renderQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endGame();
            return;
        }

        const question = questions[currentQuestionIndex];
        elements.questionCounter.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
        let html = ``;

        // Render based on game type
        if (gameType === 'MCQ') {
            html = `
                <h3 class="text-xl font-semibold mb-4">${question.prompt}</h3>
                <div class="space-y-3">
                    ${question.options.map((option, index) => `
                        <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-100">
                            <input type="radio" name="option" value="${index}" class="mr-3">
                            <span>${option}</span>
                        </label>
                    `).join('')}
                </div>
            `;
        } // Add other game types (FIB, SEQ) here...
        
        elements.gameArea.innerHTML = html;
    }
    
    function collectAnswer() {
        if (gameType === 'MCQ') {
            const selectedOption = elements.gameArea.querySelector('input[name="option"]:checked');
            if (selectedOption) {
                 userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
            } else {
                 userAnswers[currentQuestionIndex] = null; // No answer
            }
        }
        // ... logic for other game types
    }

    async function submitResults() {
        const payload = {
            answers: userAnswers,
            time_taken: timeElapsed,
        };

        const response = await fetch(`/api/v1/games/${gameId}/submit/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const result = await response.json();
            showResultModal(result);
        } else {
            alert('Failed to submit results.');
        }
    }
    
    function showResultModal(result) {
        document.getElementById('modal-score').textContent = result.score;
        document.getElementById('modal-xp').textContent = result.xp_earned;
        const badgesHtml = result.awarded_badges.map(b => `<p>🏆 New Badge: ${b}</p>`).join('');
        document.getElementById('modal-badges').innerHTML = badgesHtml;
        document.getElementById('result-modal').classList.remove('hidden');
    }

    function endGame() {
        clearInterval(timerInterval);
        elements.gameArea.innerHTML = `<h2 class="text-2xl text-center">Game Complete! Submitting your results...</h2>`;
        elements.nextBtn.classList.add('hidden');
        elements.submitBtn.classList.add('hidden');
        submitResults();
    }

    elements.nextBtn.addEventListener('click', () => {
        collectAnswer();
        currentQuestionIndex++;
        if (currentQuestionIndex === questions.length - 1) {
            elements.nextBtn.classList.add('hidden');
            elements.submitBtn.classList.remove('hidden');
        }
        renderQuestion();
    });

    elements.submitBtn.addEventListener('click', () => {
        collectAnswer();
        endGame();
    });
    
    // Initial fetch
    fetch(`/api/v1/games/${gameId}/`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
            questions = data.questions;
            if (questions.length > 0) {
                renderQuestion();
                startTimer();
            } else {
                elements.gameArea.innerHTML = `<p>No questions found for this game.</p>`;
            }
        });
});