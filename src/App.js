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
    let newValue = currentValue;
    // delete the zero at the beginning
    if (result === 0 && currentValue === '0') {
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
      newValue += el;
    }
    setIsOperatorActive(false);
    setCurrentValue(newValue.toString());
  }

  const calcOperation = (el) => {
    if (result === 0) {
      setResult(parseFloat(currentValue));
      setOperators((prevState) => {
        let newState = { ...prevState };
        newState.current = el;
        return newState;
      });
      return;
    } 

    const val = parseFloat(parseFloat(currentValue).toFixed(4));
    switch (operators.previous) {
      case '+':
        setResult(parseFloat(parseFloat(result + val).toFixed(4)));
        break;
      case '-':
        setResult(parseFloat(parseFloat(result - val).toFixed(4))); 
        break;
      case '*':
        setResult(parseFloat(parseFloat(result * val).toFixed(4)));
        break;
      case '/':
        setResult(parseFloat(parseFloat(result / val).toFixed(4)));
        break;
      case '%':
        setResult(parseFloat(parseFloat(result % val).toFixed(4)));
        break;
      default:
        break;
    }
    if (el === '=') {
      setOperators((prevState) => {
        let newState = { ...prevState };
        newState.previous = '=';
        newState.current = el;
        return newState;
      });
    } else {
      setOperators((prevState) => {
        let newState = { ...prevState };
        newState.current = el;
        return newState;
      });
    }
  }

  const handleClick = (el) => {
    if (!isNaN(parseFloat(el)) || el === '.') {
      handleNumber(el);
      return;
    } else if (el === "CE") {
      setCurrentValue('0');
      setOperators((prevState) => {
        let newState = { ...prevState };
        newState.current = '';
        return newState;
      });
    } else if (el === "C") {
      setResult(0);
      setIsOperatorActive(false);
      setOperators((prevState) => {
        let newState = {...prevState};
        newState.current = '';
        newState.previous = '';
        return newState;
      });
    } else {
      calcOperation(el);
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
