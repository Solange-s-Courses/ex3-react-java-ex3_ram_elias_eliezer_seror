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
            {error && <div className="text-danger">{message}</div>}
        </div>
    );
};

export default Guess;


// import React from 'react';
//
// const Guess = ({guess, handleInputChange, error, message}) => {
//     return (
//         <div className="form-group">
//             <label htmlFor="guessInput">Guess:</label>
//             <div className="form-group">
//                 {guess.map((value, index) => (
//                     <input
//                         key={index}
//                         type="text"
//                         className="form-control"
//                         id={`guessInput${index}`}
//                         placeholder={"Guess.."}
//                         maxLength={1}
//                         value={value}
//                         onChange={(e) => handleInputChange(e, index)}
//                         style={{ display: "inline-block" }}
//                     />
//                 ))}
//                 { error && <div className="alert alert-danger">{message}</div> }
//
//             </div>
//         </div>)
// };
//
// export default Guess;