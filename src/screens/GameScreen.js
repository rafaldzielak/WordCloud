import React, { useEffect, useContext, useState } from "react";
import GameContext from "../context/GameContext";

import { useHistory } from "react-router";

const GameScreen = () => {
  const history = useHistory();
  const { getQuestion, game, setResult, nick } = useContext(GameContext);
  const [checkResults, setCheckResults] = useState(false);
  const [chosenWords, setChosenWords] = useState([]);
  let arrayIndex = -1;
  if (!nick) history.push("/");

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  const showResult = (word) => (
    <>
      {game.good_words.includes(word) ? (
        <span className='green'>Good</span>
      ) : (
        <span className='light-red'>Bad</span>
      )}
    </>
  );

  const showWord = (word) => {
    const isWordChosen = chosenWords.includes(word);
    const doesWordMatch = game.good_words.includes(word);
    let classForWord = "";
    if (isWordChosen) {
      if (checkResults) classForWord = doesWordMatch ? "light-green" : "red";
      else classForWord = "grey";
    }

    return (
      <td key={arrayIndex} className='two-lines'>
        <div className='word-field' style={game.marginArr[arrayIndex]}>
          {checkResults && isWordChosen && showResult(word)}
          <br />
          <span className={classForWord} onClick={() => toggleChosenWord(word)}>
            {word}
          </span>
        </div>
      </td>
    );
  };

  const toggleChosenWord = (word) => {
    if (checkResults) return;
    if (chosenWords.includes(word)) setChosenWords((prev) => prev.filter((w) => w !== word));
    else setChosenWords((prev) => [...prev, word]);
  };

  const endGame = () => {
    let goodAnswers = 0;
    let badAnswers = 0;
    for (let word of chosenWords) {
      if (game.good_words.includes(word)) goodAnswers++;
      else badAnswers++;
    }
    const notAnswered = game.good_words.length - goodAnswers;
    setResult(goodAnswers * 2 - badAnswers - notAnswered);
    setCheckResults(true);
  };

  return (
    <main>
      {game && <h2 className='capitalize mt'>{game.question}</h2>}
      <div className='rectangle'>
        <table>
          <tbody>
            {game?.rows?.map((row, i) => (
              <tr key={i}>
                {row.map((word) => {
                  arrayIndex++;
                  return showWord(word);
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!checkResults ? (
        <button onClick={() => endGame()} className='btn'>
          check answers
        </button>
      ) : (
        <button onClick={() => history.push("/results")} className='btn'>
          finish game
        </button>
      )}
    </main>
  );
};

export default GameScreen;
