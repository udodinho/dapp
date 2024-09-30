import { useEffect, useCallback, useContext } from "react";
import { ethers } from "ethers";
import { WalletConnectContext } from "../context/walletContext";

export const useEIP1193InjectedWalletProvider = () => {
  const { provider, setProvider,
    account, setAccount,
    balance, setBalance,
    network, setNetwork,
    error, setError } = useContext(WalletConnectContext);

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
        } else {
          setAccount(null)
          fetchBalance(null)
        }

      };

      const handleChainChanged = async (_chainId) => {
        try {
          const walletProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(walletProvider);

          const network = await walletProvider.getNetwork();
          setNetwork(network);
        } catch (err) {
          setError(err.message);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [account, fetchBalance, provider]);

  return { account, balance, network, error, connectWallet, fetchBalance };
}