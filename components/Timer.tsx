import React, { useEffect } from 'react';

interface TimerProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, setTimeLeft, onTimeUp }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp, setTimeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isUrgent = timeLeft < 30;

  return (
    <div className={`font-mono text-xl font-bold px-4 py-2 rounded-full border transition-colors duration-300 ${
      isUrgent 
        ? 'bg-red-500/20 border-red-500 text-red-200 animate-pulse' 
        : 'bg-indigo-500/20 border-indigo-400 text-indigo-200'
    }`}>
      {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;