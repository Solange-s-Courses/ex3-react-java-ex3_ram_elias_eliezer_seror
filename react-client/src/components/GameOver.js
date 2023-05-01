import React, {useState} from 'react';

const GameOver = ({score, handleNewGame, error, setError, message, setMessage}) => {
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [highScores, setHighScores] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/java_react_war/api/highscores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName: name, score: score})
        })
            .then(response => {
                if (!response.ok) {
                    setError(true)
                    setMessage('Error Submitting- server down')
                    throw new Error('Error sending score to server');
                }
                setSubmitted(true);
                setError(false)
                setMessage('')
                return fetch('/java_react_war/api/highscores');
            })
            .then(response => response.json())
            .then(data => setHighScores(data))
            .catch(error => {
                console.error(error);
            });
    };

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handlePlayAgain = () => {
        setSubmitted(false);
        setName('');
        handleNewGame(); // Call handleNewGame function

    };

    return (
            <div className="card bg-transparent bg-opacity-50 p-3 mb-5 border-0">
                {!submitted && (
                    <>
                        <h1 className="text-center mb-5">You Won!</h1>
                        <h2 className="text-center mb-4">Your score: {score}</h2>
                        <form onSubmit={handleSubmit} className="d-flex flex-column">
                            <div className="form-group mb-3">
                                <label htmlFor="name" className="form-label">
                                    Enter your name:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    value={name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary align-self-center mb-4">
                                Submit
                            </button>
                            {error && <div className="text-danger text-center">{message}</div>}
                        </form>
                    </>
                )}
                {submitted && (
                    <>
                        <h1 className="text-center mb-5">Thank you for submitting your score!</h1>
                        <h2 className="text-center mb-4">Top 5 players:</h2>
                        <div className="table-responsive">
                            <table className="table bg-white table-bordered table-striped text-center mx-auto">
                                <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                {highScores.reduceRight((acc, score, index) => {
                                    acc.push(
                                        <tr key={index}>
                                            <td>{score.userName}</td>
                                            <td>{score.score}</td>
                                        </tr>
                                    );
                                    return acc;
                                }, [])}
                                </tbody>
                            </table>
                            <div className="d-flex flex-column align-items-center">
                                <button className="btn btn-primary btn-lg mx-auto mb-3" onClick={handlePlayAgain}> New Game </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
    );
};

export default GameOver;
