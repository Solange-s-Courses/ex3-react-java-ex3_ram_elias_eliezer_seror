import React, {useState, useEffect} from 'react';

import Guess from './Guess';
import History from './History';

const GameBoard = () => {
    const [solution, setSolution] = useState('');
    const [guess, setGuess] = useState(['', '', '', '']);
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setSolution(generateSolution());
    }, []);

    function generateSolution() {
        // Generate a 4-digit random number/color combination
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += digits[Math.floor(Math.random() * digits.length)];
        }
        console.log(result); // Print the solution in the console
        return result;
    }

    function handleNewGame() {
        setSolution(generateSolution());
        setGuess(['', '', '', '']);
        setHistory([]);
        setMessage('');
        setError(false);
    }

    function handleGameRules() {
        setMessage('The objective of the game is to guess a 4-digit number/color combination. Each digit in the combination is unique and the digits can be in any order. For each guess, you will receive feedback in the form of "bulls" and "cows". A "bull" indicates that a digit in your guess is in the correct position, while a "cow" indicates that a digit in your guess is in the wrong position. Use the feedback to refine your guesses and eventually guess the correct combination.');
    }

    function handleInputChange(e, index) {
        console.log("in input change")
        const newGuess = [...guess];
        newGuess[index] = parseInt(e.target.value);
        setGuess(newGuess);
        setError(false);
        setMessage('');
    }

    function checkGuess() {
        guess.forEach(digit => {
            if (digit === '') {
                setError(true);
                setMessage('Guess must contain 4 digits.');
            }
        })

        if (!error) { //check why it doesnt work!!
            const currentGuess = guess.join('');
            let bulls = 0;
            let cows = 0;
            for (let i = 0; i < currentGuess.length; i++) {
                if (currentGuess[i] === solution[i]) {
                    bulls++;
                } else if (solution.includes(currentGuess[i])) {
                    cows++;
                }
            }

            setHistory([
                {guess: currentGuess, bulls: bulls, cows: cows},
                ...history,
            ]);

            if (bulls === 4) {
                setSolution(generateSolution());
                // End game logic goes here
                console.log('You won!');
            }
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mb-3">
                    <img src="https://cdn.akamai.steamstatic.com/steam/apps/2078210/capsule_616x353.jpg?t=1665514818"
                         alt="Example image"/>
                </div>
                <div className="row ">
                <div className="col-sm-6 mb-3">
                    <button className="btn btn-primary" onClick={handleNewGame}> New Game</button>
                </div>
                <div className="col-sm-6 mb-3">
                    <button className="btn btn-primary" onClick={handleGameRules}> Game rules</button>
                </div>
                    <div className="col mb-3">
                        <Guess guess={guess}
                               handleInputChange={handleInputChange}
                               error={error}
                               message={message}/>
                    </div>
                    <div className="col-sm-12">
                        <button className="btn btn-primary" onClick={checkGuess}> Guess</button>
                    </div>

                <div className="col-md-6">
                    <History history={history}/>
                </div>
                </div>
            </div>
        </div>

    );
};

export default GameBoard;
