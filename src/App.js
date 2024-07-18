import React, { useState } from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import Quiz from './components/Quiz';
import './quizz.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [score, setScore] = useState(null);

  const handleStartQuiz = () => {
    if (username) {
      setIsQuizStarted(true);
    } else {
      alert('Please enter your username');
    }
  };

  const handleQuizComplete = (score) => {
    setScore(score);
  };

  return (
    <div className="blur-container">
      <Header />
      {!isQuizStarted ? (
        <div className="username">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="button" id="start-btn" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      ) : score === null ? (
        <>
          <Timer initialTime={600} onTimeUp={() => handleQuizComplete(0)} />
          <Quiz onQuizComplete={handleQuizComplete} />
        </>
      ) : (
        <div id="score-container">
          <h2>Quiz Completed</h2>
          <p id="score">
            Thank you for participating! You scored {score} out of {12}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
