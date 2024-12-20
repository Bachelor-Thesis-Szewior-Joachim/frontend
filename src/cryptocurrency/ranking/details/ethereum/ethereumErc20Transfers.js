import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../../../security';

const EthereumErc20Transfers = () => {
    const [address, setAddress] = useState('');
    const [erc20Transfers, setErc20Transfers] = useState([]);

    const fetchErc20Transfers = async () => {
        const token = getToken(); // Get the token from localStorage
        const headers = { 'Authorization': `Bearer ${token}` };

        try {
            const response = await axios.get(`http://localhost:8080/ethereum/account/erc20transfers/${address}`, { headers });
            setErc20Transfers(response.data);
        } catch (error) {
            console.error('Error fetching ERC20 transfers:', error);
        }
    };

    return (
        <div>
            <h3>Ethereum ERC-20 Transfers</h3>
            <input
                type="text"
                placeholder="Enter Ethereum Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={fetchErc20Transfers}>Get ERC-20 Transfers</button>
            {erc20Transfers.length > 0 ? (
                <ul>
                    {erc20Transfers.map((transfer, index) => (
                        <li key={index}>
                            <p>Token Name: {transfer.tokenName}</p>
                            <p>From: {transfer.from}</p>
                            <p>To: {transfer.to}</p>
                            <p>Value: {transfer.value}</p>
                            <p>Gas Used: {transfer.gasUsed}</p>
                            <p>Transaction Hash: {transfer.hash}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transfers found.</p>
            )}
        </div>
    );
};

export default EthereumErc20Transfers;
