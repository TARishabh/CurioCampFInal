import React, { useState } from "react";
import questions from "./questions.json";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const MCQpage = () => {
  const { id } = useParams();
  const url = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/"
  const module_id = localStorage.getItem("module_id");
  const content_id = localStorage.getItem("content_id");
  const [selectedAnswers, setSelectedAnswers] = useState(
    questions.results.map(() => "")
  );
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const handleAnswerSelection = (selectedOption) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setSelectedAnswers(updatedAnswers);
  };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.results.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleSubmit = () => {
    let correctCount = 0;
    questions.results.forEach((question, index) => {
      if (question.content_options[selectedAnswers[index]].is_correct) {
        correctCount++;
      }
    });
    setCorrectAnswersCount(correctCount);
    setQuizSubmitted(true);
    const postData = {
      user: 1, // Replace userId with the actual user ID
      course: id, // Replace courseId with the actual course ID
      // module_id: 1, // Replace moduleId with the actual module ID
      // content_id: contentId, // Replace contentId with the actual content ID
      answers: selectedAnswers, // Assuming selectedAnswers is an array of selected options
    };
    console.log(`${url}submit_answers/`);
    fetch(`${url}submitanswers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success response
          console.log("Answers submitted successfully!");
          toast.success('Answers submitted successfully!',{ autoClose: 1300,draggablePercent: 20});

        } else {
          // Handle error response
          console.error("Failed to submit answers");
          toast.error('Failed to submit answers');
        }
      })
      .catch((error) => {
        console.error("Error submitting answers:", error);
        toast.error('Error submitting answers');

      });
  };
  return (
    <div className="conatiner relative h-screen">
      <div className="flex absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex-col mt-10 w-screen px-5 h-screen items-center text-black">
        {!quizSubmitted ? (
          <>
            <div className="p-4 m-3 w-full lg:w-3/5 shadow-lg rounded-2xl">
              <h4 className="mt-1 text-md">
                Question {currentQuestionIndex + 1} of{" "}
                {questions.results.length}
              </h4>
              <div className="mt-3 mb-3 text-2xl">
                {questions.results[currentQuestionIndex].title}
              </div>
              {questions.results[currentQuestionIndex].content_options.map(
                (answer, answerIndex) => (
                  <div
                    key={answerIndex}
                    className="ml-3 flex border-2  px-4 py-4 rounded-2xl m-2 border-indigo-600"
                  >
                    <input
                      type="radio"
                      name={`question_${currentQuestionIndex}`}
                      value={answerIndex}
                      id={`question_${currentQuestionIndex}_${answerIndex}`}
                      checked={
                        selectedAnswers[currentQuestionIndex] === answerIndex
                      }
                      onChange={() => handleAnswerSelection(answerIndex)}
                    />
                    <label
                      className="ml-3"
                      htmlFor={`question_${currentQuestionIndex}_${answerIndex}`}
                    >
                      {answer.options_text}
                    </label>
                  </div>
                )
              )}
            </div>
            <div className="flex gap-10 lg:gap-96">
              <button
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-2xl "
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                className=" px-12 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-2xl "
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.results.length - 1}
              >
                Next
              </button>
            </div>
            {currentQuestionIndex === questions.results.length - 1 && (
              <button
                className="btn-submit px-12 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-2xl "
                onClick={handleSubmit}
              >
                Submit Answers
              </button>
            )}
          </>
        ) : (
          <div className="flex absolute top-1/2 shadow-lg left-1/2 -translate-x-[50%] -translate-y-[50%] flex-col px-5 py-5 gap-1 rounded-xl items-center text-black">
            <h1 className="text-2xl font-bold">Quiz Submitted!</h1>
            <h2>You got {correctAnswersCount} correct answers.</h2>
            <button>
              <Link to="/courses/1">
                <button className="btn-submit px-8 mt-3 py-2 text-lg font-medium text-center text-white bg-indigo-600 rounded-2xl">
                  Go Back
                </button>
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default MCQpage;