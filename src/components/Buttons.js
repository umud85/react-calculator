import React from 'react';
import styles from '../styles/Buttons.module.css';

const buttons = ["C", "CE", "%", "/", 7, 8, 9, "*",
  4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "="];

const Buttons = (props) => {
  return <div className={styles['keyboard']}>
    {buttons.map((el, ind) => {
      return el === 0
        ? <button
          key={el}
          className={styles['span-2']}
          onClick={() => props.handleClick(el)}
        >{el}
        </button>
        : <button
            key={el}
            onClick={() => props.handleClick(el)}
          >
            {el}
          </button>
    })}
  </div>
}

export default Buttons;