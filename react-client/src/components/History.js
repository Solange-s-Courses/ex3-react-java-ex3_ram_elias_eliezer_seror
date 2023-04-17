import React from 'react';

const History = ({ history }) => {
    return (
        <div className="col-md-6">
            <h2>History</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Guess</th>
                    <th>Bulls</th>
                    <th>Cows</th>
                </tr>
                </thead>
                <tbody>
                {history.map((item, index) => (
                    <tr key={index}>
                        <td>{item.guess}</td>
                        <td>{item.bulls}</td>
                        <td>{item.cows}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default History;
