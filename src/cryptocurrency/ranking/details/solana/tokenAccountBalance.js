import React, { useState } from 'react';

const TokenAccountBalanceComponent = () => {
    const [value, setValue] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTokenAccountBalance = () => {
        setLoading(true);
        fetch(`http://localhost:8080/solana/token/tokenAccountBalance/${value}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching token account balance:", error);
                setLoading(false);
            });
    };

    return (
        <div>
            <h3>Solana Token Account Balance</h3>

            {/* Input Field for Token Account Value */}
            <input
                type="text"
                placeholder="Enter token account address"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ marginRight: '10px' }}
            />
            <button onClick={fetchTokenAccountBalance}>Fetch Balance</button>

            {/* Display Loading or Data */}
            {loading && <p>Loading...</p>}
            {data && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
                    <h4>Token Account Balance</h4>
                    <p><strong>Amount:</strong> {data.amount}</p>
                    <p><strong>Decimals:</strong> {data.decimals}</p>
                    <p><strong>UI Amount:</strong> {data.uiAmount}</p>
                    <p><strong>UI Amount String:</strong> {data.uiAmountString}</p>
                </div>
            )}
        </div>
    );
};

export default TokenAccountBalanceComponent;