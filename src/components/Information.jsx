import "./Information.css";
import { StoreContext } from "../store";
import { useContext, useState } from "react";

const Information = () => {
  const { store, setStore } = useContext(StoreContext);
  const { accountStatus, account } = store;
  const [isConnectBtnDisable, setIsConnectBtnDisable] = useState(false);

  console.log(accountStatus);

  const onConnectBtnClickMap = {
    metaMaskRequired: () => {
      window.open("https://metamask.io/", "_blank").focus();
    },
    notConnected: async () => {
      try {
        setIsConnectBtnDisable(true);
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setStore({ accountStatus: "connected", account: accounts[0] });
        setIsConnectBtnDisable(false);
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
    <div className="card">
      <h2>Information</h2>
      <button
        className="connect-btn"
        disabled={isConnectBtnDisable}
        onClick={onConnectBtnClickMap[accountStatus]}
      >
        {connectBtnTextMap[accountStatus]}
      </button>
      <h2>26.57865327 BNB</h2>
      <input type="number" placeholder="Please enter amount" />
      <div className="information-btn-group">
        <button>Deposit</button>
        <button>Withdrawal</button>
      </div>
    </div>
  );
};

export default Information;
