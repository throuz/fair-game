import "./App.css";
import contractAddress from "./utils/contractAddress";
import Game from "./components/Game";
import History from "./components/History";
import HowToPlay from "./components/HowToPlay";
import Information from "./components/Information";

const App = () => {
  const onContractAddressClick = () => {
    window
      .open(`https://bscscan.com/address/${contractAddress}`, "_blank")
      .focus();
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="header-title">FAIR GAME</h1>
        <h3 className="header-subtitle">
          50% chance of 100% reward on every bet
        </h3>
        <button className="contract-address" onClick={onContractAddressClick}>
          {contractAddress}
        </button>
      </div>
      <div className="container">
        <Information />
        <Game />
        <HowToPlay />
        <History />
      </div>
    </div>
  );
};

export default App;
