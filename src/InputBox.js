import { useEffect, useState } from "react";

export default function InputBox(props) {
  const [inputVal, setInputVal] = useState('');

    useEffect(() => {
        props.callBack(" ", 0, -1);
    },[])

  function onChange(e) {
    const nonDigit = /[^0-9]/;
    if(nonDigit.test(e.target.value)){
        setInputVal(e.target.value);
        props.callBack(e.target.value, props.rowID, props.colID);
    }
  }

  return (
    <input
      ref={props.Iref}
      className="inputBox"
      maxLength={1}
      onChange={onChange}
      value={inputVal}
      onKeyDown={(e) => props.onKeyDown(e, props.colID)}
      //disabled = {inputVal !== ''}
    />
  );
}
