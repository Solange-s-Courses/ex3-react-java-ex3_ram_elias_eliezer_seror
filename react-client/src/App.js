import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';

function App() {
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    function handleGameOver(score) {
        setScore(score);
    }

    function handlePlayAgain() {
        setGameOver(false);
        setScore(0);
    }

    return (
        <div className="App">
            {!gameOver && <GameBoard handleGameOver={handleGameOver} />}
            {gameOver && <GameOver score={score} handleNewGame={handlePlayAgain}  />}
        </div>
    );
}

export default App;
