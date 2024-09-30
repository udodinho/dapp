import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { WalletConnectProvider } from "./context/walletContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WalletConnectProvider>
    <App />
    </WalletConnectProvider>
  </StrictMode>,
)
