import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';

function App() {
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    /**
     * function to handle game over include sent the username and score to the server
     * @param score
     */
    function handleGameOver(score) {
        setScore(score);
        // send score to backend
        fetch('/java_react_war/api/highscores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ score })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error sending score to server');
                }
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setGameOver(true);
            });
    }

    /**
     * function to handle play again button
     */
    function handlePlayAgain() {
        setGameOver(false);
        setScore(0);
    }

    return (
        <div className="App">
            {!gameOver && <GameBoard handleGameOver={handleGameOver} />}
            {gameOver && <GameOver score={score} handleNewGame={handlePlayAgain} />}
        </div>
    );
}

export default App;
