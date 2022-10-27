import "./ConnectButton.css";
import { StoreContext } from "../store";
import { useContext } from "react";
import formatEther from "../utils/formatEther";
import useErrorHandle from "../hooks/useErrorHandle";
import useFairGameContract from "../hooks/useFairGameContract";

const ConnectButton = () => {
  const errorHandle = useErrorHandle();
  const { store, setStore } = useContext(StoreContext);
  const { status, address } = store;
  const fairGameContract = useFairGameContract();

  const onConnectBtnClickMap = {
    metaMaskRequired: () => {
      window.open("https://metamask.io/", "_blank").focus();
    },
    notConnected: async () => {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const userBalance = await fairGameContract.users(accounts[0]);
        setStore({
          ...store,
          status: "connected",
          address: accounts[0],
          balance: formatEther(userBalance),
        });
      } catch (error) {
        errorHandle(error);
      }
    },
    connected: () => {
      window.open(`https://bscscan.com/address/${address}`, "_blank").focus();
    },
    demo: () => {},
  };

  const connectBtnTextMap = {
    metaMaskRequired: "Install MetaMask",
    notConnected: "Connect MetaMask",
    connected: address,
    demo: "Demo Account",
  };

  return (
    <button className="connect-btn" onClick={onConnectBtnClickMap[status]}>
      {connectBtnTextMap[status]}
    </button>
  );
};

export default ConnectButton;
