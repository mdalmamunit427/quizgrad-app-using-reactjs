import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizHeader from "./QuizHeader";

const Loading = () => (
  <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
    <p className="text-xl text-gray-500">Loading...</p>
  </div>
);

// Utility function to format time
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    return formattedTime;
  };

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); 
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/quiz.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching quiz data:", error));

    // Set up the timer interval
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        // Check if the timer is greater than 0 before decrementing
        return prevTimer > 0 ? prevTimer - 1 : prevTimer;
      });
    }, 1000);
   
    setTimerIntervalId(intervalId);

    
    return () => {
      clearInterval(intervalId);
      if (timer <= 0) {
        setShowResult(true);
      }
    };
  }, [timer]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    // Handle answer selection logic here
    const updatedAnswers = { ...answers, [questionId]: selectedOption };
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    clearInterval(timerIntervalId);

    // Calculate score and show result
    setTimeout(() => {
      const quizScore = calculateScore(answers);
      setScore(quizScore);
      const percentage = (quizScore / questions.length) * 100;
      // Determine the status based on the percentage
      const newStatus = percentage >= 50 ? "Passed" : "Failed";
      setStatus(newStatus);

      setShowResult(true);
      setLoading(false);
    }, 5000);
  };

  const calculateScore = (userAnswers) => {
    const correctAnswers = questions.map((question) => question.answer);
    let score = 0;
    for (const questionId in userAnswers) {
      if (userAnswers[questionId] === correctAnswers[questionId - 1]) {
        score++;
      }
    }
    return score;
  };

  // Reset states and reload the page
  const restartQuiz = () => {
    setAnswers({});
    setScore(0);
    setShowResult(false);
    setLoading(false);
    setTimer(60); 
    navigate("/quiz"); 
  };

  return (
    <section>
      <QuizHeader timer={timer} />
      <div className="md:w-9/12 w-[90%] flex md:flex-row flex-col mx-auto">
        {/* question section */}
        <div className="md:w-[70%] w-full">
          <div>
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="m-3 py-3 px-4 shadow-sm border border-gray-200 rounded "
              >
                <p className="flex items-center rounded text-xs p-2 cursor-pointer">
                  <span className="h-8 w-8 bg-[#FCC822] rounded-full flex justify-center items-center text-green-800 mr-3">
                    {index + 1}
                  </span>
                  <p className="">{question.question}</p>
                </p>
                <div className="grid grid-cols-2 gap-4 mt-5">
                  {question.options.map((option, index) => (
                    <div
                      className={`border border-gray-200 rounded text-xs p-2 cursor-pointer ${
                        answers[question.id] === option ? "bg-gray-300" : ""
                      }`}
                      key={option}
                      onClick={() => handleAnswerSelect(question.id, option)}
                    >
                      <p className="text-[10px] mb-1">Option {index + 1}</p>
                      <p>{option}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleSubmit} className="bg-[#FCC822] px-6 py-2 text-white rounded">
              Submit Quiz
            </button>
          </div>
        </div>

        {/* answer  section*/}
        <div className="md:w-[30%] w-full p-4">
          {showResult && (
            <div>
              <h3 className="text-2xl font-medium">Your Score: </h3>
              <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
              <h3 className={`text-xl ${status === "Passed" ? "text-green-800" : "text-red-500"}`}>
              {status}
            </h3>
                <h1 className="text-3xl font-bold my-2">
                  {score * 10}
                  <span className="text-slate-800">/60</span>
                </h1>
                <p className="text-sm flex justify-center items-center gap-2">
                  Total Time:{" "}
                  <span className="text-xl text-orange-500">
                    {formatTime(60 - timer)}
                    <span className="text-xs">sec</span>
                  </span>
                </p>
              </div>
              <button
                onClick={restartQuiz}
                className="bg-[#FCC822] text-white w-full py-2 rounded mt-16"
              >
                Restart
              </button>
            </div>
          )}

          {loading && <Loading />}
        </div>
      </div>
    </section>
  );
};


export default Quiz;
