import React, { useState } from 'react';
import questionsData from './questionsData';
import './Quiz.css';

const Quiz = ({ onQuizComplete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 4;
  const [userAnswers, setUserAnswers] = useState(Array(questionsData.length).fill(null));

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const score = userAnswers.reduce((score, answer, index) => {
      return answer === questionsData[index].answer ? score + 1 : score;
    }, 0);
    onQuizComplete(score);
  };

  const renderQuestions = () => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, questionsData.length);
    return questionsData.slice(startIndex, endIndex).map((question, index) => (
      <div className="question" key={index}>
        <p>Question {startIndex + index + 1}: {question.question}</p>
        {question.options.map((option, i) => (
          <label key={i}>
            <input
              type="radio"
              name={`question${startIndex + index}`}
              value={option}
              checked={userAnswers[startIndex + index] === option}
              onChange={() => handleAnswerChange(startIndex + index, option)}
            />
            {option}
          </label>
        ))}
      </div>
    ));
  };

  return (
    <div>
      <div id="question-container">{renderQuestions()}</div>
      <div className="pagination-controls">
        <button
          type="button"
          id="prev-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {currentPage < Math.ceil(questionsData.length / questionsPerPage) ? (
          <button type="button" id="next-btn" onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        ) : (
          <button type="button" id="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
