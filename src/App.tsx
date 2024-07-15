import React, { useState } from 'react';
import Board from './components/Board';
import './index.css';

const App = () => {
  const [gameStatus, setGameStatus] = useState('');
  const [timeTaken, setTimeTaken] = useState(0);
  const [clicks, setClicks] = useState(0);

  const handleGameEnd = (status, time, clicks) => {
    setTimeTaken(time);
    setClicks(clicks);
    setGameStatus(status);
  };

  const renderGameStatus = () => {
    if (gameStatus === 'success') {
      return <h2>Success!</h2>;
    } else if (gameStatus === 'failed') {
      return <h2>Failed</h2>;
    }
    return null;
  };

  const renderResults = () => (
    <div>
      <h2>Game Over</h2>
      <p>Time Taken: {timeTaken}s</p>
      <p>Clicks: {clicks}</p>
    </div>
  );

  return (
    <div>
      <h1>Memory Game</h1>
      {gameStatus === '' && (
        <Board setGameStatus={setGameStatus} handleGameEnd={handleGameEnd} />
      )}
      {gameStatus !== '' && (
        <>
          {renderGameStatus()}
          {renderResults()}
        </>
      )}
    </div>
  );
};

export default App;
