import React, { useEffect, useState } from 'react';
import CountdownTimer from './CountdownTimer';
import './App.css';

function App() {
  const [targetDate, setTargetDate] = useState(() => {
    const savedDate = localStorage.getItem('targetDate');
    return savedDate ? savedDate : '';
  });
  const [isCountingDown, setIsCountingDown] = useState(() => {
    return localStorage.getItem('isCountingDown') === 'true';
  });

  const handleDateChange = (e) => {
    setTargetDate(e.target.value);
  };

  const startTimer = () => {
    if (new Date(targetDate) > new Date()) {
      setIsCountingDown(true);
      localStorage.setItem('targetDate', targetDate);
      localStorage.setItem('isCountingDown', 'true');
    } else {
      alert('Please select a valid future date and time.');
    }
  };

  const stopTimer = () => {
    setIsCountingDown(false);
    localStorage.removeItem('targetDate');
    localStorage.removeItem('isCountingDown');
  };

  useEffect(() => {
    if (!isCountingDown) {
      localStorage.removeItem('targetDate');
      localStorage.removeItem('isCountingDown');
    }
  }, [isCountingDown]);

  return (
    <div className="App">
      <h1><span className='h'>Countdown</span> <span className='timer'>Timer</span></h1>
      {!isCountingDown ? (
        <div className="input-form">
          <input 
            type="datetime-local" 
            value={targetDate} 
            onChange={handleDateChange} 
            min={new Date().toISOString().slice(0, -8)}
          />
          <button onClick={startTimer}>Start Timer</button>
        </div>
      ) : (
        <CountdownTimer targetDate={targetDate} onStop={stopTimer} />
      )}
    </div>
  );
}

export default App;
