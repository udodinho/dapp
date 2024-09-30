import { useState } from "react";
import { useEIP1193InjectedWalletProvider } from "../hooks/WalletHook";

const WalletConnect = () => {

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
        <div className="App min-h-screen flex flex-col items-center justify-center bg-cyan-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Wallet Connection using EIP-1193</h1>

            {!account ? (
                <button
                    onClick={connectWallet}
                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition-colors mb-6"
                >
                    Connect Wallet
                </button>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <p className="text-lg font-semibold mb-2">Connected Account: <span className="font-normal">{account}</span></p>
                    <p className="text-lg font-semibold mb-2">
                        Network: <span className="font-normal">{network ? `${network.name} (${network.chainId})` : "Unknown network"}</span>
                    </p>
                    <p className="text-lg font-semibold">Balance: <span className="font-normal">{balance ? `${balance} ETH` : 'Loading...'}</span></p>
                </div>
            )}

            {error && <p className="text-red-500 font-medium mb-4">Error Message: {error}</p>}

            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Check Address Balance</h2>
                <input
                    type="text"
                    value={address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleFetchBalance}
                    className="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-700 transition-colors"
                >
                    Get Balance
                </button>
            </div>
        </div>
    );
}

export default WalletConnect