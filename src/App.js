import React, { useState, useEffect } from 'react';
import Buttons from './components/Buttons.js';
import './styles/App.css';

function App() {
  const [currentValue, setCurrentValue] = useState('0');
  const [result, setResult] = useState(0);
  const [operators, setOperators] = useState({
    previous: '',
    current: ''
  });
  const [isOperatorActive, setIsOperatorActive] = useState(false);

  useEffect(() => {
    setCurrentValue(result);
  }, [result]);

  const handleNumber = (el) => {
    let newValue = '';
    // delete the zero at the beginning
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
      // concatenate user input
      newValue = currentValue + el;
    }
    setIsOperatorActive(false);
    setCurrentValue(newValue.toString());
  }

  const calcOperation = (el) => {
    switch (operators.previous) {
      case '+':
        setResult(result + parseFloat(currentValue));
        break;
      case '-':
        setResult(result - parseFloat(currentValue)); 
        break;
      case '*':
        setResult(result * parseFloat(currentValue));
        break;
      case '/':
        setResult(result / parseFloat(currentValue));
        break;
      case '%':
        setResult(result % parseFloat(currentValue));
        break;
      default:
        break;
    }
    setOperators((prevState) => {
      let newState = { ...prevState };
      newState.current = el !== '=' ? el : '';
      return newState;
    });
  }

  const handleOperator = (el) => {
    if (result === 0) {
      setResult(parseFloat(currentValue));
    } 
    setIsOperatorActive(true);
    calcOperation(el);
  };
  const handleClick = (el) => {
    if (!isNaN(parseFloat(el))) {
      handleNumber(el);
      return;
    } else if (el === "=") {
      calcOperation(el);
      setIsOperatorActive(false);
    } else {
      handleOperator(el);
      setIsOperatorActive(true);
    }
  };
  return (
    <div className="App">
      <div className="display">{currentValue}</div>
      <Buttons
        handleClick={handleClick}
      />
    </div>
  );
};


export default App;
