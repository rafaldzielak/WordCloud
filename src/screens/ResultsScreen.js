import React, { useContext } from "react";
import GameContext from "../context/GameContext";
import { useHistory } from "react-router";

const ResultsScreen = () => {
  const { result, nick } = useContext(GameContext);
  const history = useHistory();
  if (!nick) history.push("/");
  else if (!result) history.push("/game");

  return (
    <main className='results'>
      <h1>
        {result > 0 ? "Contratulations" : "We are so sorry"}, {nick}!
      </h1>
      <h1>Your score:</h1>
      <h1 className={`${result > 0 ? "primary" : "red"}`}>{result} points</h1>
    </main>
  );
};

export default ResultsScreen;
