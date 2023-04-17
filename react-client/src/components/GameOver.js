import React, { useState } from 'react';

const GameOver = ({ score ,handleNewGame}) => {
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save the user's name and score
        console.log(`Name: ${name}, Score: ${score}`);
        setSubmitted(true);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>You Won!</h1>
                    <h2>Your score: {score}</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Enter your name:</label>
                            <input type="text" className="form-control" id="name" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GameOver;
