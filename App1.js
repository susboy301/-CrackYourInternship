import { useState, useRef } from 'react';

function Timer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => setTime(t => t + 1), 1000);
    }
  };

  const stopTimer = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  return (
    <div>
      <h1>Timer: {time} s</h1>
      <button onClick={startTimer} disabled={running}>Start</button>
      <button onClick={stopTimer} disabled={!running}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
