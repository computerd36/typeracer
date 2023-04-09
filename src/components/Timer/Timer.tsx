import { useState, useEffect } from 'react';

function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div>Time: {elapsedTime} s</div>;
}

export default Timer;
