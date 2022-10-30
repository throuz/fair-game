import "./Header.css";
import contractAddress from "../utils/contractAddress";

const Header = () => {
  const onContractAddressClick = () => {
    window
      .open(`https://bscscan.com/address/${contractAddress}`, "_blank")
      .focus();
  };

  return (
    <div className="header">
      <h1 className="header-title">FAIR GAME</h1>
      <h3 className="header-subtitle">
        50% chance of 100% reward on every bet
      </h3>
      <button className="contract-address" onClick={onContractAddressClick}>
        {contractAddress}
      </button>
    </div>
  );
};

export default Header;
