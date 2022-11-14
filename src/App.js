import React, { useState } from 'react';
import Buttons from './components/Buttons.js';
import './styles/App.css';

function App() {
  const [currentValue, setCurrentValue] = useState('0');
  const [operators, setOperators] = useState({
    previous: '',
    current: ''
  });
  const [result, setResult] = useState(0);
  const [isOperatorActive, setIsOperatorActive] = useState(false);

  const handleNumber = (el) => {
    let newValue = '';
    if (currentValue === '0') {
      newValue = el;
    } else if (currentValue !== 0 && isOperatorActive) {
      newValue = el;
      setIsOperatorActive(false);
      setOperators((prevState) => {
      let newState = { ...prevState };
        newState.previous = operators.current;
        newState.current = '';
      return newState;
    });
    } else {
      newValue = currentValue + el;
    }
    setCurrentValue(newValue.toString());
  }

  const handleOperator = (el) => {
    let prev = operators.previous;
    let current = el;
    let newResult;
    if (result === 0) {
      newResult = parseFloat(currentValue);
    } 
 
    switch (operators.previous) {
      case '+':
        newResult = result + parseFloat(currentValue);
        break;
      case '-':
        newResult = result - parseFloat(currentValue); 
        break;
      case '*':
        newResult = result * parseFloat(currentValue);
        break;
      case '/':
        newResult = result / parseFloat(currentValue);
        break;
      case '%':
        newResult = result % parseFloat(currentValue);
        break;
      default:
        break;
    }
    //   if (el === "=") {
    //   newResult = result + parseFloat(currentValue);
    //   prev = '';
    //   current = '';
    // } 
    
    setOperators((prevState) => {
      let newState = { ...prevState };
      newState.previous = prev;
      newState.current = current;
      return newState
    });
    setIsOperatorActive(true);
    setCurrentValue(newResult);
    setResult(parseFloat(newResult));
  };
  return (
    <div className="App">
      <div className="display">{currentValue}</div>
      <Buttons
        handleNumber={handleNumber}
        handleOperator={handleOperator}
      />
    </div>
  );
};


export default App;
