import "./Information.css";
import ConnectButton from "./ConnectButton";

const Information = () => {
  return (
    <div className="card">
      <h2>Information</h2>
      <ConnectButton />
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
