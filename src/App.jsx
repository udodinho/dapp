import { useState } from 'react';
import { useEIP1193InjectedWalletProvider } from './components/WalletHook';

function App() {
  const { account, balance, network, error, connectWallet, fetchBalance } = useEIP1193InjectedWalletProvider();
  const [address, setAddress] = useState("");

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handleFetchBalance = () => {
    if (address) {
      fetchBalance(address);
    }
  };

  return (
    <div className="App">
      <h1>Wallet Connection using EIP-1193</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Account: {account}</p>
          <p>Network: {network ? `${network.name} (${network.chainId})` : "Unknown network"}</p>
          <p>Balance: {balance ? `${balance} ETH` : 'Loading...'}</p>
        </div>
      )}
      
      {error && <p style={{ color: "red" }}>Error Message: {error}</p>}

      <div>
        <h2>Check Address Balance</h2>
        <input
          type="text"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter your address"
        />
        <button onClick={handleFetchBalance}>Get Balance</button>
      </div>
    </div>
  );
}

export default App;