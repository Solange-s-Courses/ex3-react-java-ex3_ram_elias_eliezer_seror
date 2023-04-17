import React from 'react';

const Guess = ({guess, handleInputChange, error, message}) => {
    return (
        <div className="form-group">
            <label htmlFor="guessInput">Guess:</label>
            <div className="form-group">
                {guess.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        className="form-control"
                        id={`guessInput${index}`}
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleInputChange(e, index)}
                        style={{ display: "inline-block" }}
                    />
                ))}
                { error && <div className="alert alert-danger">{message}</div> }

            </div>
        </div>)
};

export default Guess;
