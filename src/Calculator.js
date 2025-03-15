import React, { useState, useEffect, useCallback } from "react";
import "./Calculator.css";
import { evaluate } from "mathjs"; 

function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from local storage when the component mounts
  useEffect(() => {
    const savedHistory = localStorage.getItem("calcHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleDelete = useCallback(() => {
    setInput((prev) => prev.slice(0, -1));
  }, []);

  const handleCalculate = useCallback(() => {
    try {
      const result = evaluate(input).toString();
      const newHistory = [...history, `${input} = ${result}`];

      setHistory(newHistory);
      setInput(result);

      // Save history to local storage
      localStorage.setItem("calcHistory", JSON.stringify(newHistory));
    } catch (error) {
      setInput("Error");
    }
  }, [input, history]);

  const handlePercentage = () => {
    if (input) {
      setInput((parseFloat(input) / 100).toString());
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("calcHistory"); // Clear history from local storage
  };

  // Handle Keyboard Input
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
        setInput((prev) => prev + key);
      } else if (key === "Enter") {
        handleCalculate();
      } else if (key === "Backspace") {
        handleDelete();
      } else if (key === "Escape") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleCalculate, handleDelete]);

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />

      <div className="buttons">
        <button className="operator" onClick={handleClear}>AC</button>
        <button className="operator" onClick={handleDelete}>⌫</button>
        <button onClick={handlePercentage}>%</button>
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

      <button className="show-history" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Hide History" : "Show History"}
      </button>

      {showHistory && (
        <div className="history-container">
          <h3>Calculation History</h3>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
          <button className="clear-history" onClick={clearHistory}>Clear History</button>
        </div>
      )}
    </div>
  );
}

export default Calculator;
