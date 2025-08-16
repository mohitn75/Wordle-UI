import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import "./Row";
import Row from "./Row";
import words from "./Constants.json"

export default function App() {
  const totlRows = 5; const totalCols = 5;
  const rows = new Array(5).fill('');
  
  const refsArray = useRef(Array.from({ length: 5 }, () => Array(5).fill(null)));
  const solutionRef = useRef(null);

  const [tries, setTries] = useState();
  const [choosenWord, setChoosenWord] = useState();

  function notifyCallBack(state, tries) {
    if (state === true) {
      setTries(tries);
      if (solutionRef?.current) {
        solutionRef.current.style.display = "block";
      }
    }
  }
  async function fetchWordsFromAPI() {
    const wordleWords = words.WORDS;
    await setChoosenWord(wordleWords[Math.floor(Math.random() * wordleWords.length)].toLowerCase());
  }

  useEffect(() => {
    fetchWordsFromAPI();
  }, []);

  return (
    <div className="App">
      <h1>Wordle Game!</h1>
      {choosenWord}
      {rows.map((currRef, idx) => (
        <div>
          <Row word={choosenWord} notifyCallBack={notifyCallBack} rowID={idx} totalCols={totalCols} totalRows={totlRows} refsArray={refsArray}/>
        </div>
      ))}
      <div ref={solutionRef} className="solved">
        Solved in {tries} tries
      </div>
    </div>
  );
}
