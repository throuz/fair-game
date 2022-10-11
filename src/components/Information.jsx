import "./Information.css";
import { StoreContext } from "../store";
import { useContext } from "react";

const Information = () => {
  const { store } = useContext(StoreContext);

  console.log(store);

  return (
    <div className="card">
      <h2>Information</h2>
      <button>Connect</button>
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
