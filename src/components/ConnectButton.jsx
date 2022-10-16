import "./ConnectButton.css";
import { StoreContext } from "../store";
import { useContext, useState } from "react";

const ConnectButton = () => {
  const { store, setStore } = useContext(StoreContext);
  const { accountStatus, account } = store;
  const [isConnecting, setIsConnecting] = useState(false);

  const onConnectBtnClickMap = {
    metaMaskRequired: () => {
      window.open("https://metamask.io/", "_blank").focus();
    },
    notConnected: async () => {
      try {
        setIsConnecting(true);
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setStore({ accountStatus: "connected", account: accounts[0] });
        setIsConnecting(false);
      } catch (error) {
        console.error(error);
      }
    },
    connected: () => {
      window.open(`https://bscscan.com/address/${account}`, "_blank").focus();
    },
  };

  const connectBtnTextMap = {
    metaMaskRequired: "Install MetaMask",
    notConnected: "Connect MetaMask",
    connected: account,
  };

  return (
    <button
      className="connect-btn"
      disabled={isConnecting}
      onClick={onConnectBtnClickMap[accountStatus]}
    >
      {connectBtnTextMap[accountStatus]}
    </button>
  );
};

export default ConnectButton;
