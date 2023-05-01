import React, {useState, useEffect} from 'react';
import GameOver from './GameOver';
import Guess from './Guess';
import History from './History';


const GameBoard = ({ submitted }) => {
    const [solution, setSolution] = useState('');
    const [guess, setGuess] = useState(['', '', '', '']);
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [rules, setRules] = useState(false);
    const rulesMsg = 'The goal of the game is to guess a 4-digit number combination. The digits can be in any order and can not repeat For each guess, you will receive feedback in the form of "bulls" and "cows". A "bull" indicates that a digit in your guess is in the correct position, while a "cow" indicates that a digit in your guess is in the wrong position. Use the feedback to refine your guesses and eventually guess the correct combination.'

    useEffect(() => {
        setSolution(generateSolution());
    }, []);

    // This function generates a 4-digit random number/color combination and returns it as a string
    function generateSolution() {
        // Generate a 4-digit random number/color combination
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let result = '';
        let digit;
        while (result.length < 4) {
            digit = digits[Math.floor(Math.random() * digits.length)];
            if (!result.includes(digit)) {
                result += digit
            }
        }
        console.log('The solution is:' + result); // Print the solution in the console for the bodek
        return result;
    }

    // This function resets the game state to its initial values
    function handleNewGame() {
        setSolution(generateSolution());
        setGuess(['', '', '', '']);
        setHistory([]);
        setMessage('');
        setError(false);
        setGameOver(false);
        submitted = false;
    }

    // This function toggles the display of the game rules message
    function handleGameRules() {
        setRules(!rules)
    }

    // This function updates the guess state when a digit is entered in the input field
    function handleInputChange(e, index) {
        const newGuess = [...guess];
        const digit = e.target.value;

        if (newGuess.includes(digit)) {
            setError(true);
            setMessage(`You already used ${digit}`);
        } else {
            newGuess[index] = digit;
            setError(false);
            setMessage('');
        }

        setGuess(newGuess);
    }

    // This function checks the current guess against the solution and updates the history state
    function checkGuess() {
        setError(false)
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === '') {
                setError(true);
                setMessage('Guess must contain 4 digits.');
                return;
            }
        }

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
            {guess: currentGuess, bulls: bulls, cows: cows}, ...history,]);

        if (bulls === 4) {
            setSolution(generateSolution());
            setGameOver(true);
        }
    }

    return (
        <div className="container-fluid bg-info bg-opacity-25 justify-content-center" style={{width: '100vw', height: '300vh'}}>
            {gameOver ?
                <GameOver score={history.length} handleNewGame={handleNewGame} error={error} setError={setError} message={message} setMessage={setMessage} />
                :
                <div className="row">
                    <div className="col d-flex justify-content-center mb-3">
                        <img
                            src="https://cdn.akamai.steamstatic.com/steam/apps/2078210/capsule_616x353.jpg?t=1665514818"
                            alt="Example image"
                            style={{width: '50vw', height: '20vw'}}
                        />
                    </div>
                    <div className="row ">
                        <div className="col-6 mb-3 d-flex justify-content-center">
                            <button className="btn btn-success" onClick={handleNewGame}> New Game</button>
                        </div>
                        <div className="col-6 mb-3 d-flex justify-content-center">
                            <button className="btn btn-warning" onClick={handleGameRules}> Game rules</button>
                        </div>
                        {rules &&
                            <div className="col-9 mb-3 mx-auto justify-content-center">
                                <div className="text-success mb-3">{rulesMsg}</div>
                            </div>
                        }
                    <div className="row d-flex justify-content-center ">
                        <div className="col-9 mb-3">
                            <Guess guess={guess}
                                   handleInputChange={handleInputChange}
                                   error={error}
                                   message={message}/>
                        </div>
                    </div>
                        <div className="col-sm-12 d-flex justify-content-center mb-3">
                            <button className="btn btn-primary" onClick={checkGuess}> Go!</button>
                        </div>

                        <div className="col-md-12 d-flex justify-content-center">
                            <History history={history}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default GameBoard;
