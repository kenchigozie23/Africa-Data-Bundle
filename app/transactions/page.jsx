'use client';

import { useState } from 'react';

export default function TransactionsPage() {
  const [formData, setFormData] = useState({
    network: 'mtn',
    volume: 2,
    recipient: '0241234567',
    reference: 'fc817748-dd15-45e4-9a98-7521f61626ff',
    agent_id: 'dK12345dd1545e49a98',
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Initialize Transaction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Network:
          <input
            type="text"
            name="network"
            value={formData.network}
            onChange={handleChange}
          />
        </label>
        <label>
          Volume:
          <input
            type="number"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
          />
        </label>
        <label>
          Recipient:
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
          />
        </label>
        <label>
          Reference:
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
          />
        </label>
        <label>
          Agent ID:
          <input
            type="text"
            name="agent_id"
            value={formData.agent_id}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
