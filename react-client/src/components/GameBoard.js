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

    function handleInputChange(e, index) {
        const newGuess = [...guess];
        newGuess[index] = e.target.value;
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

        if (!error) {
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
                <div className="col-md-6">
                    <img src="https://cdn.akamai.steamstatic.com/steam/apps/2078210/capsule_616x353.jpg?t=1665514818"
                         alt="Example image"/>
                </div>
                <div className="row">
                    <div className="col-md-3">
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
