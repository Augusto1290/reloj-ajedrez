import React, { useState, useEffect } from 'react';
import './ChessClock.css';

function ChessClock() {
  const initialTime = 10 * 60; // 10 minutos en segundos
  const [player1Time, setPlayer1Time] = useState(initialTime);
  const [player2Time, setPlayer2Time] = useState(initialTime);
  const [activePlayer, setActivePlayer] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let timer;

    if (!isPaused) {
      timer = setInterval(() => {
        if (activePlayer === 1) {
          setPlayer1Time((prevTime) => prevTime - 1);
        } else if (activePlayer === 2) {
          setPlayer2Time((prevTime) => prevTime - 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [activePlayer, isPaused]);

  const handleStartPlayer = (player) => {
    setActivePlayer(player);
    setIsPaused(false);
  };

  const handlePauseGame = () => {
    setIsPaused(true);
  };

  const handleRestartGame = () => {
    setPlayer1Time(initialTime); 
    setPlayer2Time(initialTime); 
    setActivePlayer(null);
    setIsPaused(true);
  };


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="chess-clock">
      <div className="game-controls">
        <button onClick={handlePauseGame}>Pausar</button>
        <button onClick={handleRestartGame}>Reiniciar Juego</button>
      </div>
      <div className="timer-container">
        <div className="timers">
          <div onClick={() => handleStartPlayer(1)} className={`timer ${activePlayer === 1 ? 'active' : ''}`}>
            JUGADOR 1: {formatTime(player1Time)}
          </div>
          <div onClick={() => handleStartPlayer(2)} className={`timer ${activePlayer === 2 ? 'active' : ''}`}>
            JUGADOR 2: {formatTime(player2Time)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChessClock;