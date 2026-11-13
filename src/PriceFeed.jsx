import { useState, useEffect } from "react";
import { ethers } from "ethers";

// Домашнее задание: верифицированный контракт в Sepolia —
// Chainlink Data Feed ETH/USD (AggregatorV3Interface).
// https://sepolia.etherscan.io/address/0x694AA1769357215DE4FAC081bf1f309aDC325306
const feedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
const abi = [
  "function description() view returns (string)",
  "function decimals() view returns (uint8)",
  "function version() view returns (uint256)",
  "function latestRoundData() view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)",
];

function PriceFeed({ provider }) {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");

  async function loadPrice() {
    try {
      setError("");
      const feed = new ethers.Contract(feedAddress, abi, provider);
      const description = await feed.description();
      const decimals = await feed.decimals();
      const version = await feed.version();
      const round = await feed.latestRoundData();
      console.log(round);

      setInfo({
        description,
        version: version.toString(),
        roundId: round.roundId.toString(),
        price: ethers.formatUnits(round.answer, decimals),
        updatedAt: new Date(Number(round.updatedAt) * 1000).toLocaleString(),
      });
    } catch (err) {
      console.log(err);
      setError(err.shortMessage ?? err.message);
    }
  }

  useEffect(() => {
    loadPrice();
  }, [provider]);

  return (
    <div className="container">
      <h1>Chainlink Price Feed</h1>
      {error && <div className="balance">Error: {error}</div>}
      {info && (
        <>
          <div className="balance">
            {info.description}: {info.price} USD
          </div>
          <div className="details">
            <p>Round ID: {info.roundId}</p>
            <p>Updated at: {info.updatedAt}</p>
            <p>Feed version: {info.version}</p>
            <p>Contract: {feedAddress}</p>
          </div>
        </>
      )}
      <button onClick={loadPrice}>Refresh</button>
    </div>
  );
}

export default PriceFeed;
