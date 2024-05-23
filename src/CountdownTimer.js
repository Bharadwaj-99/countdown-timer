import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate, onStop }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      onStop();
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      <div className="countdown">
        <div>
          {timeLeft.days} <span>Days</span>
        </div>
        <div>
          {timeLeft.hours} <span>Hours</span>
        </div>
        <div>
          {timeLeft.minutes} <span>Minutes</span>
        </div>
        <div>
          {timeLeft.seconds} <span>Seconds</span>
        </div>
      </div>
      <button onClick={onStop}>Stop Timer</button>
    </div>
  );
};

export default CountdownTimer;
