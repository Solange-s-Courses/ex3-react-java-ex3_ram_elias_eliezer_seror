import React, { useState, useEffect } from 'react';

const GameOver = ({ score, handleNewGame }) => {
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [highScores, setHighScores] = useState([]);

    console.log("in game over")

     useEffect(() => {
         fetch('/java_react_war/api/highscores')
             .then(response => response.json())
             .then(data => setHighScores(data))
             .catch(error => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Name: ${name}, Score: ${score}`);
        fetch('/java_react_war/api/highscores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: name, score: score })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error sending score to server');
                }
                setSubmitted(true);
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
        //setSubmitted(false);
        setName('');
        handleNewGame(); // Call handleNewGame function

    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    {!submitted && (
                        <>
                            <h1>You Won!</h1>
                            <h2>Your score: {score}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Enter your name:</label>
                                    <input type="text" className="form-control" id="name" required value={name} onChange={handleInputChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </>
                    )}
                    {submitted && (
                        <>
                            <h1>Thank you for submitting your score!</h1>
                            <button className="btn btn-primary" onClick={handlePlayAgain}>New Game</button>
                            <h2>High Scores</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                {  highScores.reduceRight((acc, score, index) => {
                                    acc.push(
                                        <tr key={index}>
                                            <td>{highScores.length - index}</td>
                                            <td>{score.userName}</td>
                                            <td>{score.score}</td>
                                        </tr>
                                    );
                                    return acc;
                                }, [])
                                }
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameOver;
