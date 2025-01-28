import React, { useState, useEffect } from 'react';
import './Game.css';
import { fetchWords} from '../src/serverCommunication/gameData.jsx';

function Game() {
  const [wordsList, setWordList] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
     const loadWords = async () => {
       try {
         const words = await fetchWords();
         setWordList(words);
       } catch (err) {
         setError(err.message);
       }
     };
 
     loadWords();
   }, []);

  const currentPair = wordsList[currentIndex];


  const handleVerify = () => {
    if (!currentPair) return;

    if (guess === currentPair._name) {
      setScore((prevScore) => prevScore + 1);
    }

    setGuess('');

    if (currentIndex + 1 < wordsList.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setGuess('');
    setFinished(false);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="game-container">
      {wordsList.length > 0 && !finished ? (
        <div className="game-card">
          <h1>Friendionary - Joc</h1>
          <p>
            <strong>A spus celebra replică:</strong> "{currentPair?._description}"
          </p>
          <input
            type="text"
            placeholder="Numele persoanei..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="game-input"
          />
          <button className="verify-button" onClick={handleVerify}>
            Verifică
          </button>
        </div>
      ) : finished ? (
        <div className="game-card">
          <h1>Scor Final</h1>
          <p>
            Ai obținut {score} puncte din {wordsList.length}!
          </p>
          <button className="restart-button" onClick={handleRestart}>
            Joacă din nou
          </button>
          <a href="/start" className="exit-button">
            Exit Game Mode
          </a>
        </div>
      ) : (
        <p>Se încarcă datele...</p>
      )}
    </div>
  );
}

export default Game;
