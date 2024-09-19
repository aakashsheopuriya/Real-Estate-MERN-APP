import React, { useState } from "react";
import "./App.css";
function FirstApp() {
  const [amount, setAmount] = useState(0);
  const handleIncreament = () => {
    setAmount(amount + 1);
  };
  const handleDecreament = () => {
    setAmount(amount - 1);
  };
  return (
    <div>
      <h1>Increament/Decreament App</h1>
      <button onClick={() => handleIncreament()}>+</button>
      <span>{amount}</span>

      <button onClick={() => handleDecreament()}>-</button>
    </div>
  );
}

export default FirstApp;
