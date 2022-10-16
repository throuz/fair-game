import "./Information.css";
import Balance from "./Balance";
import ConnectButton from "./ConnectButton";

const Information = () => {
  return (
    <div className="card">
      <h2>Information</h2>
      <ConnectButton />
      <Balance />
      <input type="number" placeholder="Please enter amount" />
      <div className="information-btn-group">
        <button>Deposit</button>
        <button>Withdrawal</button>
      </div>
    </div>
  );
};

export default Information;
