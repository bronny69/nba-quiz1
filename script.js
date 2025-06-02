let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score');

// 當網頁載入完成時設置事件監聽器
document.addEventListener('DOMContentLoaded', () => {
    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
});

// 開始遊戲
function startGame() {
    console.log('遊戲開始');  // 新增除錯訊息
    startButton.classList.add('d-none');
    questionContainer.classList.remove('d-none');
    // 重置分數
    score = 0;
    scoreElement.textContent = score;
    // 打亂題目順序
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

// 設置下一題
function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        // 遊戲結束
        endGame();
    }
}

// 重置頁面狀態
function resetState() {
    nextButton.classList.add('d-none');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// 顯示問題
function showQuestion(question) {
    questionElement.textContent = question.question;
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('btn', 'option-btn', 'btn-outline-primary', 'w-100');
        button.addEventListener('click', () => selectAnswer(index, question));
        optionsContainer.appendChild(button);
    });
}

// 選擇答案
function selectAnswer(selectedIndex, question) {
    const buttons = optionsContainer.getElementsByClassName('option-btn');
    Array.from(buttons).forEach(button => {
        button.disabled = true;
    });

    const selectedButton = buttons[selectedIndex];
    const correct = selectedIndex === question.correct;

    if (correct) {
        selectedButton.classList.remove('btn-outline-primary');
        selectedButton.classList.add('correct');
        score += 5; // 答對加5分
    } else {
        selectedButton.classList.remove('btn-outline-primary');
        selectedButton.classList.add('wrong');
        score = Math.max(0, score - 1); // 答錯扣1分，但不會低於0分
        
        // 顯示正確答案
        buttons[question.correct].classList.remove('btn-outline-primary');
        buttons[question.correct].classList.add('correct');
    }

    // 更新分數顯示
    scoreElement.textContent = score;

    // 顯示解釋
    const explanation = document.createElement('div');
    explanation.classList.add('alert', correct ? 'alert-success' : 'alert-danger', 'mt-3');
    explanation.textContent = question.explanation;
    questionContainer.appendChild(explanation);

    nextButton.classList.remove('d-none');
}

// 遊戲結束
function endGame() {
    questionContainer.innerHTML = `
        <div class="card-body">
            <h3 class="card-title">遊戲結束！</h3>
            <p class="card-text">你的最終得分是：${score} 分</p>
            <button class="btn btn-primary" onclick="startGame()">重新開始</button>
        </div>
    `;
}
