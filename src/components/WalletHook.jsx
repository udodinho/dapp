import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

export const useEIP1193InjectedWalletProvider = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        throw new Error('No provider found');
      }

      const walletProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(walletProvider);

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        await fetchBalance(accounts[0]);
      }

      const networkData = await walletProvider.getNetwork();
      setNetwork(networkData);
    } catch (err) {
      setError(`Error connecting wallet: ${err.message}`);
    }
  }, []);

  const fetchBalance = useCallback(async (address) => {
    if (!provider || !address) return;
    try {
      const balance = await provider.getBalance(address);
      setBalance(ethers.formatEther(balance));
    } catch (err) {
      setError(`Error fetching balance: ${err.message}`);
    }
  }, [provider]);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0 && accounts[0] !== account) {
          setAccount(accounts[0]);
          fetchBalance(accounts[0]);
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [account, fetchBalance]);

  return { account, balance, network, error, connectWallet, fetchBalance };
}