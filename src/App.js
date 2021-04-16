import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import GameProvider from "./context/GameProvider";
import GameScreen from "./screens/GameScreen";
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";

function App() {
  return (
    <div className='App'>
      <GameProvider>
        <Router>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/game' component={GameScreen} />
          <Route exact path='/results' component={ResultsScreen} />
        </Router>
      </GameProvider>
    </div>
  );
}

export default App;
