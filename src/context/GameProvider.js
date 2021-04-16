import React, { useState, useCallback } from "react";
import GameContext from "./GameContext";
import gamesArr from "../data/apidata";
import getRandomInt from "../utils/randomInt";

const GameProvider = ({ children }) => {
  const [nick, setNick] = useState("");
  const [game, setGame] = useState({});
  const [result, setResult] = useState(0);

  const getQuestion = useCallback(() => {
    const questionNumber = getRandomInt(0, gamesArr.length);
    const game = gamesArr[questionNumber];
    const allWordsNumber = game.all_words.length;
    const columnsNumber = allWordsNumber > 24 ? 6 : 4;
    const rowsNumber = Math.ceil(allWordsNumber / columnsNumber + 2);
    const arrayWithBlanks = fillArrayWithBlankFields(game.all_words, rowsNumber * columnsNumber);
    const rows = getRowsFromArray(arrayWithBlanks, rowsNumber, columnsNumber);
    const marginArr = createRandomRemsArray(arrayWithBlanks.length, columnsNumber, rowsNumber);
    setGame({ question: game.question, rows, good_words: game.good_words, marginArr });
  }, []);

  return (
    <GameContext.Provider value={{ setNick, game, nick, getQuestion, setResult, result }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;

const fillArrayWithBlankFields = (array, desiredNumberOfElements) => {
  const arrayWithBlanks = [...array];
  while (arrayWithBlanks.length < desiredNumberOfElements) {
    const randomPlace = getRandomInt(0, arrayWithBlanks.length);
    const temp = arrayWithBlanks[randomPlace];
    arrayWithBlanks[randomPlace] = "";
    arrayWithBlanks.push(temp);
  }
  return arrayWithBlanks;
};

const getRowsFromArray = (array, rowsNumber, columnsNumber) => {
  const rows = [];
  for (let i = 0; i < rowsNumber; i++) {
    rows.push(array.slice(i * columnsNumber, i * columnsNumber + columnsNumber));
  }
  return rows;
};

const createRandomRemsArray = (length, columnsNumber, rowsNumber) => {
  const getRandomRemValues = (maxRem) => `${getRandomInt(0, maxRem, true)}.${getRandomInt(0, 9, true)}rem`;
  const xAxismargin = columnsNumber > 4 ? 4 : 5;
  const yAxismargin = rowsNumber > 4 ? 3 : 4;
  const randomRemsArray = [];
  for (let i = 0; i < length; i++) {
    randomRemsArray.push({
      marginRight: getRandomRemValues(xAxismargin),
      marginLeft: getRandomRemValues(xAxismargin),
      marginTop: getRandomRemValues(yAxismargin),
      marginBottom: getRandomRemValues(yAxismargin),
    });
  }
  return randomRemsArray;
};
