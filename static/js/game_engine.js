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
        progressBar: document.getElementById('progress-bar'),
    };

    function startTimer() {
        timerInterval = setInterval(() => {
            timeElapsed++;
            const minutes = Math.floor(timeElapsed / 60).toString().padStart(2, '0');
            const seconds = (timeElapsed % 60).toString().padStart(2, '0');
            elements.timer.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }

    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        elements.progressBar.style.width = `${progress}%`;
    }

    function renderQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endGame();
            return;
        }

        const question = questions[currentQuestionIndex];
        elements.questionCounter.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
        let html = ``;

        if (gameType === 'MCQ') {
            html = `
                <div class="w-full">
                    <h3 class="text-2xl font-semibold text-center mb-6">${question.prompt}</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${question.options.map((option, index) => `
                            <label class="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all has-[:checked]:bg-purple-100 has-[:checked]:border-brand-purple hover:border-brand-purple">
                                <input type="radio" name="option" value="${index}" class="h-4 w-4 text-brand-purple focus:ring-brand-purple border-gray-300 mr-4">
                                <span class="text-lg">${option}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        elements.gameArea.innerHTML = html;
        updateProgress();
    }
    
    function collectAnswer() {
        if (gameType === 'MCQ') {
            const selectedOption = elements.gameArea.querySelector('input[name="option"]:checked');
            userAnswers[currentQuestionIndex] = selectedOption ? parseInt(selectedOption.value) : null;
        }
    }

    async function submitResults() {
        clearInterval(timerInterval);
        const payload = { answers: userAnswers, time_taken: timeElapsed };

        try {
            const response = await fetch(`/api/v1/games/${gameId}/submit/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-CSRFToken': '{{ csrf_token }}'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                document.getElementById('modal-score').textContent = result.score;
                document.getElementById('modal-xp').textContent = result.xp_earned;
                const badgesHtml = result.awarded_badges.map(b => `<p>🏆 New Badge: ${b}</p>`).join('');
                document.getElementById('modal-badges').innerHTML = badgesHtml;
                document.getElementById('result-modal').classList.remove('hidden');
            } else {
                alert('Failed to submit results.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred while submitting results.');
        }
    }

    function endGame() {
        elements.gameArea.innerHTML = `<h2 class="text-2xl text-center font-semibold">Game Complete!</h2><p class="text-gray-600 text-center mt-2">Submitting your results...</p>`;
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
    
    // Initial fetch to start the game
    fetch(`/api/v1/games/${gameId}/`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => {
            if (!res.ok) throw new Error('Failed to load game data');
            return res.json();
        })
        .then(data => {
            questions = data.questions;
            if (questions && questions.length > 0) {
                renderQuestion();
                startTimer();
            } else {
                elements.gameArea.innerHTML = `<p class="text-center text-gray-500">No questions found for this game.</p>`;
                elements.nextBtn.classList.add('hidden');
            }
        })
        .catch(err => {
            console.error("Game loading error:", err);
            elements.gameArea.innerHTML = `<p class="text-center text-red-500">Could not load the game. Please try again later.</p>`;
            elements.nextBtn.classList.add('hidden');
        });
});