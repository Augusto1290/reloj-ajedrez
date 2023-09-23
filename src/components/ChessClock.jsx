
import React, { useState, useEffect } from 'react';
import './ChessClock.css';

function ChessClock() {
  const [player1Time, setPlayer1Time] = useState(600);
  const [player2Time, setPlayer2Time] = useState(600);
  const [activePlayer, setActivePlayer] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configPlayer1Time, setConfigPlayer1Time] = useState('0');
  const [configPlayer2Time, setConfigPlayer2Time] = useState('0');
  const [increment, setIncrement] = useState(0);

  const handleConfigModalOpen = () => {
    setShowConfigModal(true);
  };

  const handleConfigModalClose = () => {
    setShowConfigModal(false);
  };

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const handleConfigSave = () => {
    const newPlayer1Time = parseInt(configPlayer1Time) * 60;
    const newPlayer2Time = parseInt(configPlayer2Time) * 60;

    setPlayer1Time(newPlayer1Time);
    setPlayer2Time(newPlayer2Time);

    setShowConfigModal(false);
  };

  useEffect(() => {
    let timer;
  
    if (!isPaused) {
      timer = setInterval(() => {
        if (activePlayer === 1) {
          setPlayer1Time((prevTime) => {
            const newTime = prevTime - 1;
            if (newTime === 0) {
              clearInterval(timer);
              alert('¡Jugador 2 gana!');
              setPlayer1Time(600);
              setPlayer2Time(600);
            }
            return newTime;
          });
        } else if (activePlayer === 2) {
          setPlayer2Time((prevTime) => {
            const newTime = prevTime - 1;
            if (newTime === 0) {
             
              clearInterval(timer);
              alert('¡Jugador 1 gana!');
              setPlayer1Time(600);
              setPlayer2Time(600);
            }
            return newTime;
          });
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

    if (increment > 0) {
      if (player === 1) {
        setPlayer1Time((prevTime) => prevTime + increment * 60); 
        
        
      } else if (player === 2) {
        setPlayer2Time((prevTime) => prevTime + increment * 60); 
      }

    }
  };

  const handlePauseGame = () => {
    setIsPaused(true);
  };

  const handleRestartGame = () => {
    setPlayer1Time(600);
    setPlayer2Time(600);
    setActivePlayer(null);
    setIsPaused(true);
  };

  return (
    <div className="chess-clock">
      <button onClick={handleConfigModalOpen}>Configurar Temporizadores</button>
      {showConfigModal && (
        <div className="config-modal">
          <h2>Configuración de Temporizadores</h2>
          <label>
            Jugador 1 (minutos):
            <input
              type="number"
              value={configPlayer1Time}
              onChange={(e) => setConfigPlayer1Time(e.target.value)}
            />
          </label>
          <label>
            Jugador 2 (minutos):
            <input
              type="number"
              value={configPlayer2Time}
              onChange={(e) => setConfigPlayer2Time(e.target.value)}
            />
          </label>
          <label>
            Incremento (minutos):
            <input
              type="number"
              value={increment}
              onChange={(e) => setIncrement(e.target.value)}
            />
          </label>
          <button onClick={handleConfigSave}>Guardar</button>
          <button onClick={handleConfigModalClose}>Cancelar</button>
        </div>
      )}

      <div className="game-controls">
        <button onClick={handlePauseGame}>Pausar</button>
        <button onClick={handleRestartGame}>Reiniciar Juego</button>
      </div>
      
      <div className="timer-container">
        <div
          onClick={() => handleStartPlayer(1)}
          className={`timer ${activePlayer === 1 ? 'active' : ''}`}
        >
          JUGADOR 1:  {formatTime(player1Time)}
        </div>
        <div
          onClick={() => handleStartPlayer(2)}
          className={`timer ${activePlayer === 2 ? 'active' : ''}`}
        >
          JUGADOR 2:  {formatTime(player2Time)}
        </div>
      </div>
    </div>
  );
}

export default ChessClock;