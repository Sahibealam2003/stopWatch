import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { goingOn, pause, reset, resume, start } from "./Utils/timeSlice";

const App = () => {
  const [show, setShow] = useState(false);
  const { time, isRunning } = useSelector((store) => store.timer);
  const dispatch = useDispatch();
  const stopeTime = useRef();

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const timeStyle = (time) => time.toString().padStart(2, "0");

  useEffect(() => {
    if (isRunning) {
      stopeTime.current = setInterval(() => {
        dispatch(goingOn());
      });
    } else {
      clearInterval(stopeTime.current);
    }
    return () => clearInterval(stopeTime.current);
  }, [isRunning]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-200">
        Stopwatch
      </h1>

      <div className="text-5xl sm:text-6xl font-mono mb-10 tracking-wider bg-black px-8 py-4 rounded-lg shadow-lg border border-white">
        {timeStyle(minutes)} : {timeStyle(seconds)} : {timeStyle(milliseconds)}
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => dispatch(start())}
          className="bg-green-950 hover:bg-green-400 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Start
        </button>

        <button
          onClick={() => { 
            dispatch(reset()) 
            setShow(false)}}
          disabled={time === 0}
          className={`${
            time === 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } text-white font-semibold px-6 py-2 rounded shadow`}
        >
          Reset
        </button>

        {show ? (
          <button
            onClick={() => {
              setShow(false);
              dispatch(resume());
            }}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded shadow"
          >
            Resume
          </button>
        ) : (
          <button
            disabled={!isRunning}
            onClick={() => {
              setShow(true);
              dispatch(pause());
            }}
            className={`${
              !isRunning
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            } text-black font-semibold px-6 py-2 rounded shadow`}
          >
            Pause
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
