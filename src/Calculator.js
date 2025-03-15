import React, { useState } from "react";
import "./Calculator.css"; // Ensure this CSS file exists
import { evaluate } from "mathjs";

function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleDelete = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const result = evaluate(input).toString();
      setHistory((prevHistory) => [`${input} = ${result}`, ...prevHistory.slice(0, 4)]);
      setInput(result);
    } catch (error) {
      setInput("Error");
    }
  };

  const handlePercentage = () => {
    if (input) {
      setInput((parseFloat(input) / 100).toString());
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleHistoryClick = (entry) => {
    const expression = entry.split(" = ")[0];
    setInput(expression);
  };

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />

      <div className="buttons">
        <button onClick={handleClear}>AC</button>
        <button onClick={handleDelete}>⌫</button>
        <button onClick={handlePercentage}>%</button>
        <button onClick={() => handleClick("/")}>/</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={handleCalculate}>=</button>
      </div>

      {/* Toggle History Button */}
      <button className="toggle-history" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Hide History" : "Show History"}
      </button>

      {/* History Section */}
      {showHistory && (
        <div className="history">
          <h3>History</h3>
          <ul>
            {history.map((entry, index) => (
              <li key={index} onClick={() => handleHistoryClick(entry)}>
                {entry}
              </li>
            ))}
          </ul>
          {history.length > 0 && (
            <button className="clear-history" onClick={clearHistory}>
              Clear History
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Calculator;
