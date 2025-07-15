import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {

    // if the timer hits 0, reset timer and mark the question as unanswered
    if (timeRemaining === 0) {
      setTimeRemaining(10); // reset time to 10 seconds
      onAnswered(false); //notify parent component that the question wasn't answered
      return; //exit early
    }

    //this set up a timeout that decreases the timer by 1 after 1 second.
    const timeoutId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timeoutId); // cleanup function preventing multiple overlapping timers from stacking up.

  }, [timeRemaining, onAnswered]);// dependency arrary telling react to re-render the effect when timeRemaining or onAnswered changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
