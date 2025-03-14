import React, { useState } from "react";
import "./Calculator.css"; // Ensure this CSS file exists
import { evaluate } from "mathjs"; 

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1)); // Remove the last character
  };

  const handleCalculate = () => {
    try {
      setInput(evaluate(input).toString()); // ✅ Safely evaluate expression
    } catch (error) {
      setInput("Error");
    }
  };

  const handlePercentage = () => {
    if (input) {
      setInput((parseFloat(input) / 100).toString());
    }
  };
  
  


  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />

      <div className="buttons">
        {/* First Row */}
        <button className="operator" onClick={handleClear}>AC</button>
        <button className="operator" onClick={handleDelete}>⌫</button>
        <button className="operator" onClick={() => handleClick("DEL")}>DEL</button>
        <button onClick={handlePercentage}>%</button>
        <button className="operator" onClick={() => handleClick("/")}>/</button>

        {/* Second Row */}
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button className="operator" onClick={() => handleClick("*")}>*</button>

        {/* Third Row */}
        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button className="operator" onClick={() => handleClick("-")}>-</button>

        {/* Fourth Row */}
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button className="operator" onClick={() => handleClick("+")}>+</button>

        {/* Fifth Row */}
        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button className="equal" onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
