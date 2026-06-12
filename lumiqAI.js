import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const style = {
  container: {
    padding: "20px",
    border: "1px solid #E0E0E0",
    borderRadius: "15px",
    width: "max-content",
    marginBottom: "40px",
  },
  question: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  options: {
    marginBottom: "5px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#FFF",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  feedback: {
    marginTop: "10px",
    fontSize: "14px",
  },
};

function QuizApp() {
  // do not modify the questions or answers below
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correct: "Paris",
    },
    {
      question: "What is the capital of Germany?",
      options: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
      correct: "Berlin",
    },
  ];

  // __define-ocg__ State variables to manage the quiz progression
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // Using the mandatory variable name here
  const varOcg = questions[currentQuestionIndex];

  const handleSubmit = () => {
    // Prevent submitting without choosing an option
    if (!selectedOption) return;

    const isCorrect = selectedOption === varOcg.correct;
    let updatedScore = score;

    if (isCorrect) {
      setFeedback("Correct!");
      updatedScore = score + 1;
      setScore(updatedScore);
    } else {
      setFeedback("Incorrect!");
    }

    // Determine if there are more questions remaining
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(""); // Reset chosen option for the next question
    } else {
      setIsQuizComplete(true);
    }
  };

  if (isQuizComplete) {
    return (
      <div style={style.container}>
        <div style={style.question}>
          Quiz Complete! You scored {score} out of {questions.length}!
        </div>
      </div>
    );
  }

  return (
    <div style={style.container}>
      <div id="question" style={style.question}>
        {varOcg.question}
      </div>
      <div style={style.options}>
        {varOcg.options.map((option, index) => {
          // Unique ID starting at 1: option1, option2, etc.
          const inputId = `option${index + 1}`;
          return (
            <div key={inputId} style={{ marginBottom: "8px" }}>
              <input
                type="radio"
                id={inputId}
                name="quiz-option"
                value={option}
                checked={selectedOption === option}
                onChange={(e) => setSelectedOption(e.target.value)}
                style={{ marginRight: "8px" }}
              />
              <label htmlFor={inputId}>{option}</label>
            </div>
          );
        })}
      </div>
      <button
        style={style.button}
        id="submitBtn"
        onClick={handleSubmit}
        disabled={!selectedOption}
      >
        Submit
      </button>
      {feedback && (
        <div id="feedback" style={style.feedback}>
          {feedback}
        </div>
      )}
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<QuizApp />);
