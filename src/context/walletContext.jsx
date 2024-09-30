import { createContext, useState } from "react";

const wallet = {
    provider: null,
    setProvider: () => {},
    account: null,
    setAccount: () => {},
    balance: 0,
    setBalance: () => {},
    network: null,
    setNetwork: () => {},
    error: null,
    setError: () => {},
}

const WalletConnectContext = createContext(wallet);

const WalletConnectProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [network, setNetwork] = useState(null);
    const [error, setError] = useState(null);

    return (
        <WalletConnectContext.Provider value={{
            provider, setProvider,
            account, setAccount,
            balance, setBalance,
            network, setNetwork,
            error, setError
        }}>
            {children}
        </WalletConnectContext.Provider>
    );
};

export { WalletConnectContext, WalletConnectProvider }