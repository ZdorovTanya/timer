import React, { useEffect, useState } from "react";
import useSound from "use-sound";

import "../src/App.css";
import "../src/flip.css";

function App() {
  const [secondCount, setSecondCount] = useState(0);
  const [minuteCount, setMinuteCount] = useState(0);
  const [hourCount, setHourCount] = useState(0);
  const [startBtn, setStartBtn] = useState(false);
  const [stopAnimation, setStopAnimation] = useState(false);

  const [playSecond] = useSound("/sound/seconds.mp3");
  const [playMinute] = useSound("/sound/minute.mp3");
  const [playHour] = useSound("/sound/hour.mp3");

  useEffect(() => {
    if (startBtn) {
      setTimeout(() => {
        setSecondCount((prev) => prev + 1);
        playSecond();
        if (secondCount === 60) {
          setMinuteCount((prev) => prev + 1);
          setSecondCount(0);
          playMinute();
        }
        if (minuteCount === 60) {
          setHourCount((prev) => prev + 1);
          setMinuteCount(0);
          playHour();
        }
      }, 1000);
    }
  }, [secondCount, minuteCount, startBtn]);

  return (
    <div className="App">
      <div className="box left">
        <div className="">
          <span>{hourCount}</span>
          <span className={`${(minuteCount === 60) ? "flip" : ""}`}>{hourCount}</span>
        </div>
      </div>


      <div className="box">
        <div className="">
          <span>{minuteCount}</span>
          <span className={`${((secondCount === 60)) ? "flip" : ""}`}>
            {minuteCount}
          </span>
        </div>
      </div>

      <div className="box right">
        <div className="">
          <span>{secondCount}</span>
          <span className={`${stopAnimation ? "flip" : ""}`}>
            {secondCount}
          </span>
        </div>
      </div>

      <div className="button">
        <button
          disabled={startBtn}
          onClick={() => setStartBtn(!startBtn)}
          onMouseDown={() => setStopAnimation(!stopAnimation)}
        >
          start
        </button>
        <button
          disabled={!startBtn}
          onClick={() => setStartBtn(!startBtn)}
          onMouseDown={() => setStopAnimation(!stopAnimation)}
        >
          stop
        </button>
      </div>
    </div>
  );
}

export default App;
