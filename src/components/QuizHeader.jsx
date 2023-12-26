/* eslint-disable react/prop-types */

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const QuizHeader = ({ timer }) => {
    
  return (
    <section className="shadow-sm my-5 py-2 sticky top-0 bg-white z-10 " id="alertContainer">
      <div className="w-9/12 mx-auto flex md:flex-row flex-col justify-between items-center">
        <div className="font-normal">
          <span className="text-red-700">Attention!</span> You have 60 seconds to
          answer 6 questions.
          <br />
          Please keep an eye on the timer and make sure to answer all questions
          before time runs out.
        </div>
        <div className="flex items-center">
          <p className="mr-2 text-xl text-gray-700">
            <i className="fa-solid fa-clock-rotate-left"></i>
          </p>
          <div className="text-left">
            <h1 className="text-green-700 text-xl" id="count">
              {formatTime(timer)}
              <sub className="text-xs ml-1">sec</sub>
            </h1>
            <p className="text-xs -mt-1 text-gray-700">Time Consumed</p>
          </div>
        </div>
      </div>
    </section>
  );
};


export default QuizHeader;
