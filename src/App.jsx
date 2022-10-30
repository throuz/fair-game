import "./App.css";
import Game from "./components/Game";
import Header from "./components/Header";
import History from "./components/History";
import HowToPlay from "./components/HowToPlay";
import Information from "./components/Information";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Information />
        <Game />
        <HowToPlay />
        <History />
      </main>
    </div>
  );
};

export default App;
