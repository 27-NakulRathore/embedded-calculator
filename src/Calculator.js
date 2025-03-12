import React, { useState } from "react";
import "./Calculator.css"; // Make sure this file exists

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    // Prevent multiple operators in a row
    if (
      ["+", "-", "*", "/"].includes(value) &&
      (input === "" || ["+", "-", "*", "/"].includes(input.slice(-1)))
    ) {
      return;
    }
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1)); // Remove last character
  };

  const handleCalculate = () => {
    try {
      // Evaluate safely using Function constructor
      setInput(Function(`"use strict"; return (${input})`)().toString());
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />
      <div className="buttons">
        <button onClick={handleClear}>AC</button>
        <button onClick={handleDelete}>DEL</button>
        <button onClick={() => handleClick("/")}>/</button>
        <button onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={handleCalculate}>=</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
      </div>
    </div>
  );
}

export default Calculator;
