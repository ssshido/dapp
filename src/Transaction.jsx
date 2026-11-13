import { useState } from "react";
import { ethers } from "ethers";

// Заголовок транзакции (хеш). По клику загружаются и показываются детали.
function Transaction({ hash, provider }) {
  const [open, setOpen] = useState(false);
  const [tx, setTx] = useState();

  async function toggle() {
    const next = !open;
    setOpen(next);
    if (next && !tx) {
      try {
        const txInfo = await provider.getTransaction(hash);
        console.log(txInfo);
        setTx(txInfo);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="tx">
      <button className="tx-link" onClick={toggle}>
        {hash}
      </button>
      {open && (
        <div className="details">
          {!tx && <p>Loading...</p>}
          {tx && (
            <>
              <p>From: {tx.from}</p>
              <p>To: {tx.to ?? "Contract creation"}</p>
              <p>Value: {ethers.formatEther(tx.value)} ETH</p>
              <p>Nonce: {tx.nonce}</p>
              <p>Gas limit: {tx.gasLimit.toString()}</p>
              <p>Block: {tx.blockNumber}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Transaction;
