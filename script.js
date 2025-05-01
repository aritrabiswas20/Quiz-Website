const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Paris", "Rome", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which language is used for websites?",
      options: ["Python", "Java", "JavaScript", "C++"],
      answer: "JavaScript"
    },
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "High Tech Markup Language"],
      answer: "Hyper Text Markup Language"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let selectedOption = "";
  let userAnswers = [];
  
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const feedbackElement = document.getElementById('feedback');
  const nextBtn = document.getElementById('next-btn');
  const resultContainer = document.getElementById('result-container');
  const quizContainer = document.getElementById('quiz-container');
  const scoreElement = document.getElementById('score');
  const restartBtn = document.getElementById('restart-btn');
  const progressText = document.getElementById('progress-text');
  const progressFill = document.getElementById('progress-fill');
  const summaryElement = document.getElementById('summary');
  
  function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    feedbackElement.textContent = '';
    selectedOption = "";
  
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
  
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('option-btn');
      button.addEventListener('click', () => selectOption(button, option));
      optionsElement.appendChild(button);
    });
  }
  
  function selectOption(button, option) {
    selectedOption = option;
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  }
  
  function showFeedback(isCorrect, correctAnswer) {
    if (isCorrect) {
      feedbackElement.textContent = '✅ Correct!';
      feedbackElement.style.color = 'green';
    } else {
      feedbackElement.textContent = `❌ Incorrect! Correct Answer: ${correctAnswer}`;
      feedbackElement.style.color = 'red';
    }
  }
  
  nextBtn.addEventListener('click', () => {
    if (!selectedOption) {
      feedbackElement.textContent = "⚠️ Please select an option!";
      feedbackElement.style.color = 'orange';
      return;
    }
  
    const currentQ = quizData[currentQuestionIndex];
    const isCorrect = selectedOption === currentQ.answer;
    if (isCorrect) score++;
  
    userAnswers.push({
      question: currentQ.question,
      selected: selectedOption,
      correct: currentQ.answer,
      isCorrect
    });
  
    showFeedback(isCorrect, currentQ.answer);
  
    // Delay before moving to next question
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        showQuestion();
      } else {
        showResult();
      }
    }, 1000);
  });
  
  function showResult() {
    quizContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
  
    progressText.textContent = "";
    progressFill.style.width = "100%";
    scoreElement.textContent = `Your Score: ${score} / ${quizData.length}`;
  
    summaryElement.innerHTML = "<h3>Summary:</h3>";
    userAnswers.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('summary-item');
      div.innerHTML = `
        <strong>Q${index + 1}:</strong> ${item.question}<br>
        Your Answer: <span class="${item.isCorrect ? 'correct' : 'wrong'}">${item.selected}</span><br>
        Correct Answer: ${item.correct}
      `;
      summaryElement.appendChild(div);
    });
  }
  
  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = "";
    userAnswers = [];
  
    quizContainer.classList.remove('hide');
    resultContainer.classList.add('hide');
    showQuestion();
  });
  
  showQuestion();