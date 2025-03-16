import React, { useState } from "react";
import "./Calculator.css"; 
import { evaluate } from "mathjs"; 

function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false); // State to show "Copied!" message

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const result = evaluate(input).toString();
      setHistory([...history, `${input} = ${result}`]);
      setInput(result);
    } catch (error) {
      setInput("Error");
    }
  };

  const handleCopyResult = () => {
    if (input) {
      navigator.clipboard.writeText(input); // Copy to clipboard
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Hide "Copied!" after 1.5s
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />

      {/* Copy Button */}
      <button className="copy-btn" onClick={handleCopyResult}>
        📋 Copy Result
      </button>
      {copied && <span className="copied-msg">Copied!</span>} {/* Show "Copied!" */}

      <div className="buttons">
        <button className="operator" onClick={handleClear}>AC</button>
        <button className="operator" onClick={handleDelete}>⌫</button>
        <button onClick={() => handleClick("%")}>%</button>
        <button className="operator" onClick={() => handleClick("/")}>/</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button className="operator" onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button className="operator" onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button className="operator" onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button className="equal" onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
