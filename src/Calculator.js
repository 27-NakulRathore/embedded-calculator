import React, { useState, useEffect } from "react";
import "./Calculator.css";
import { evaluate } from "mathjs";

function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const result = evaluate(input).toString();
      setHistory((prevHistory) => [`${input} = ${result}`, ...prevHistory].slice(0, 10));
      setInput(result);
    } catch (error) {
      setInput("Error");
    }
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (/[\d+\-*/.%]/.test(key)) {
      setInput((prev) => prev + key);
    } else if (key === "Enter") {
      handleCalculate();
    } else if (key === "Backspace") {
      handleDelete();
    } else if (key === "Escape") {
      handleClear();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />

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

      <button className="toggle-history" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Hide History" : "Show History"}
      </button>

      {showHistory && (
        <div className="history-container">
          <h3>Calculation History</h3>
          <div className="history">
            {history.length > 0 ? (
              <ul>
                {history.map((entry, index) => (
                  <li key={index}>{entry}</li>
                ))}
              </ul>
            ) : (
              <p>No history yet.</p>
            )}
          </div>
          {history.length > 0 && (
            <button className="clear-history" onClick={() => setHistory([])}>
              Clear History
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Calculator;
