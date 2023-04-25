import React from 'react';

const History = ({ history }) => {
    return (
        <div className="col-9 mb-3">
            <div className="card bg-info bg-opacity-50 p-3 mb-5">
                <p className="card-text d-flex justify-content-center">Your guesses history: </p>

            <table className="table bg-white table-bordered border-dark table-striped-columns rounded">
                <thead>
                <tr>
                    <th className="text-center">Guess</th>
                    <th className="text-center">Bulls</th>
                    <th className="text-center">Cows</th>
                </tr>
                </thead>
                <tbody>
                {history.map((item, index) => (
                    <tr key={index}>
                        <td className="text-center">{item.guess}</td>
                        <td className="text-center">{item.bulls}</td>
                        <td className="text-center">{item.cows}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default History;
