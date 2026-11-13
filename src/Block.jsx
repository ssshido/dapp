import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";

const MAX_TX_SHOWN = 20;

function Block({ blocknum, provider }) {
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState();

  function toggle() {
    setOpen(!open);
  }

  useEffect(() => {
    async function getBlock() {
      const blockInfo = await provider.getBlock(blocknum);
      console.log(blockInfo);
      setBlock(blockInfo);
    }
    if (blocknum > 0) {
      getBlock();
    }
  }, [blocknum, provider]);

  return (
    <div className="block">
      <hr />
      <button onClick={toggle}>Block # {blocknum}</button>
      {open && block && (
        <div className="details">
          <p>Block hash: {block.hash}</p>
          <p>Parent hash: {block.parentHash}</p>
          <p>Timestamp: {new Date(block.timestamp * 1000).toLocaleString()}</p>
          <p>Transactions: {block.transactions.length}</p>
          {block.transactions.slice(0, MAX_TX_SHOWN).map((hash) => (
            <Transaction key={hash} hash={hash} provider={provider} />
          ))}
          {block.transactions.length > MAX_TX_SHOWN && (
            <p>... and {block.transactions.length - MAX_TX_SHOWN} more</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Block;
