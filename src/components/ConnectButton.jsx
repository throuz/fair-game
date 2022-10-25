import "./ConnectButton.css";
import { ethers } from "ethers";
import { StoreContext } from "../store";
import { useContext, useState } from "react";
import useFairGameContract from "../hooks/useFairGameContract";

const ConnectButton = () => {
  const { store, setStore } = useContext(StoreContext);
  const { status, address } = store;
  const fairGameContract = useFairGameContract();
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
        const userBalance = await fairGameContract.users(accounts[0]);
        setStore({
          ...store,
          status: "connected",
          address: accounts[0],
          balance: Number(ethers.utils.formatEther(userBalance)).toFixed(8),
        });
        setIsConnecting(false);
      } catch (error) {
        console.error(error);
      }
    },
    connected: () => {
      window.open(`https://bscscan.com/address/${address}`, "_blank").focus();
    },
  };

  const connectBtnTextMap = {
    metaMaskRequired: "Install MetaMask",
    notConnected: "Connect MetaMask",
    connected: address,
  };

  return (
    <button
      className="connect-btn"
      disabled={isConnecting}
      onClick={onConnectBtnClickMap[status]}
    >
      {connectBtnTextMap[status]}
    </button>
  );
};

export default ConnectButton;
