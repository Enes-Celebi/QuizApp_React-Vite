import React, { useEffect, useState } from 'react';
import Question from './Question';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    fetch('/src/questions.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error loading questions:', error));
  }, []);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isFinished) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishQuiz();
    }

    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const startQuiz = () => {
    setQuizStarted(true);
  }

  const handleNextQuestion = () => {
    if (
      questions[currentQuestionIndex].options[selectedOption].isCorrect &&
      selectedOption !== null
    ) {
      setCorrectAnswers(correctAnswers + 1);
    }
  
    if (currentQuestionIndex === questions.length - 1) {
      finishQuiz();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  
    setSelectedOption(null);
  };

  const finishQuiz = () => {
    setIsFinished(true);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIsFinished(false);
    setTimeLeft(180);
    setSelectedOption(null);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="App">
      <h1>Test your grammar!</h1>
      {!quizStarted ? (
        <div className="start-form">
          <p>Click the button below to start the quiz!</p>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : (
        <div className="quiz-container">
          <div className="timer">Time Left: {formatTime(timeLeft)}</div>
          {questions.length > 0 && !isFinished && (
            <>
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onOptionSelect={(optionIndex) => setSelectedOption(optionIndex)}
              />
              <button onClick={handleNextQuestion}>Next Question</button>
            </>
          )}
          {isFinished ? (
            <div className="quiz-results">
              <h2>Quiz Finished!</h2>
              {isFinished && (
                <p>
                  Your Score: {correctAnswers} / {questions.length}
                </p>
              )}
              <button onClick={restartQuiz}>Restart Quiz</button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default App;