import React, { useState, useContext, useRef, useEffect } from "react";
import GameContext from "../context/GameContext";
import { useHistory } from "react-router";

const HomeScreen = () => {
  const [nick, setNick] = useState("");
  const { setNick: setContextNick } = useContext(GameContext);
  const history = useHistory();
  const inputRef = useRef();

  const setNickAndStartGame = (e) => {
    e.preventDefault();
    setContextNick(nick);
    history.push("/game");
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <h1 className='head'>Wordcloud game</h1>
      <form onSubmit={setNickAndStartGame}>
        <input
          ref={inputRef}
          className='nick'
          type='text'
          placeholder='Enter your nickname here...'
          value={nick}
          onChange={(e) => setNick(e.target.value)}
          required
        />
        <br />
        <button type='submit' className='btn'>
          play
        </button>
      </form>
    </>
  );
};

export default HomeScreen;
