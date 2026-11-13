import { useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import BalanceReader from "./BalanceReader";
import BlockExplorer from "./BlockExplorer";
import VendingMachine from "./VendingMachine";
import PriceFeed from "./PriceFeed";

const providerUrl = "https://ethereum-sepolia-rpc.publicnode.com";
const provider = new ethers.JsonRpcProvider(providerUrl);

function App() {
  useEffect(() => {
    async function logNetwork() {
      const network = await provider.getNetwork();
      console.log(network); // chainId: 11155111n, name: "sepolia"
    }
    logNetwork();
  }, []);

  return (
    <>
      <BalanceReader provider={provider} />
      <BlockExplorer provider={provider} />
      <VendingMachine provider={provider} />
      <PriceFeed provider={provider} />
    </>
  );
}

export default App;
