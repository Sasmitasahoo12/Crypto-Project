import { useEffect, useState } from "react";
import axios from "axios";
import "./crypto-currency-table.css";
import Percentage from "./Percentage";

const coins = [
  { id: "bitcoin", name: "Bitcoin" },
  { id: "ethereum", name: "Ethereum" },
  { id: "dogecoin", name: "Dogecoin" },
  { id: "solana", name: "Solana" },
  { id: "binancecoin", name: "BNB" },
];

export default function CryptoTracker() {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setData(null);

        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true`
        );

        if (!response.data[selectedCoin]) {
          throw new Error("Invalid response from API");
        }

        setData(response.data[selectedCoin]);
      } catch (err) {
        setError("⚠️ Failed to fetch data. Please try again.");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [selectedCoin]);

  return (
    <div className="tracker-container">
      {/* Heading Container */}
      <div className="heading-container">
        <h1>Cryptocurrency Price Tracker</h1>
      </div>

      {/* Dropdown */}
      <select
        value={selectedCoin}
        onChange={(e) => setSelectedCoin(e.target.value)}
        className="coin-dropdown"
      >
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Data Display */}
      {data && !error && (
        <div className="crypto-card">
          <h2>{coins.find((c) => c.id === selectedCoin)?.name}</h2>
          <table className="crypto-table">
            <tbody>
              <tr>
                <td>💰 Price:</td>
                <td><strong>${data.usd.toLocaleString()}</strong></td>
              </tr>
              <tr>
                <td>📈 24h Volume:</td>
                <td>${data.usd_24h_vol.toLocaleString()}</td>
              </tr>
              <tr>
                <td>📊 24h Change:</td>
                <td 
                  className={data.usd_24h_change >= 0 ? "positive-change" : "negative-change"}
                >
                  {data.usd_24h_change.toFixed(2)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
