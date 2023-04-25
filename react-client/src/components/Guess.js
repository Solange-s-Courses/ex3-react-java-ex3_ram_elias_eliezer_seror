import React, {useState} from 'react';
import {range} from 'lodash';

const Guess = ({guess, handleInputChange, error, message}) => {
    const [options, setOptions] = useState(range(10));

    return (
        <div className="container">
            <div className="d-flex mb-3">
                {guess.map((digit, index) => (
                    <select
                        key={index}
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        className="form-select me-2"
                        aria-label="Number selection"
                    >
                        <option value={''} > </option>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ))}
            </div>
            {error && <div className="text-white text-center bg-danger">{message}</div>}
        </div>
    );
};

export default Guess;
