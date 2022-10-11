import "./App.css";
import Game from "./components/Game";
import History from "./components/History";
import HowToPlay from "./components/HowToPlay";
import Infomation from "./components/Infomation";

const App = () => {
  return (
    <div className="app">
      <h1 className="title">FAIR GAME</h1>
      <div className="container">
        <Infomation />
        <Game />
        <History />
        <HowToPlay />
      </div>
    </div>
  );
};

export default App;
