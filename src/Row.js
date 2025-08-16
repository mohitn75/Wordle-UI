import React, { useRef, useState, useEffect } from "react";
import InputBox from "./InputBox";
import useDebounce from "./useDebounce";

export default function Row(props) {
  const solution = props.word;
  const cols = new Array(5).fill('');
  const attempt = useRef([]);
  var debouncedAttempt = useDebounce(attempt.current.length === props.totalCols && attempt.current.join(""), 100);

  const [currVal, setCurrVal] = useState("");
  const [solved, setSolved] = useState(false);


  useEffect(() => {
    props.notifyCallBack(solved, props.rowID + 1);
  }, [solved]);

  function onKeyDown(e, idx){
    if(e.key === "Enter"){
        if (debouncedAttempt && (debouncedAttempt.length === props.totalCols)) {
            checker();
        }
    }
    if(e.key === "Backspace"){
        attempt.current[idx] = "";
        if(idx > 0) {
            props.refsArray.current[props.rowID][idx - 1].focus();
            props.refsArray.current[props.rowID][idx - 1].value = "";
        }
    }
  }

  useEffect(() => {
    // if (debouncedAttempt && (debouncedAttempt.length === props.totalCols)) {
    //   window.addEventListener("keydown", (event) => {
    //     if(event.key === "Enter"){
    //         checker();
    //     }

    //   })
    // }
  }, [debouncedAttempt])

    function checker() {
        if (attempt.current.join("") === solution) {
            setSolved(true);
        }

        for (let i = 0; i < attempt.current.length; i++) {
            const current = attempt.current[i];
            const el = props.refsArray.current[props.rowID][i];
            if (!el) continue;
            
            if (current === solution[i]) {
                el.style.backgroundColor = "green";
                el.style.color = "white";
            } else if (solution.includes(current)) {
                el.style.backgroundColor = "orange";
                el.style.color = "white";
            }
        }
    }

  function callBack(value, rowId, colId) {
    setCurrVal(value);
    attempt.current[colId] = value;
    if (value && colId + 1 < props.refsArray.current[rowId].length) {
        props.refsArray.current[rowId][colId + 1].focus();
    }
  }

  return (
    <>
      {cols.map((_, idx) => (
        <InputBox
          Iref={(el) => {
            props.refsArray.current[props.rowID][idx] = el;
          }}
          key={idx}
          colID={idx}
          callBack={callBack}
          rowID={props.rowID}
          onKeyDown={onKeyDown}
        />
      ))}
    </>
  );
}
