import React from 'react';
import styles from '../styles/Buttons.module.css';

const Buttons = (props) => {
  return <div className={styles['keyboard']}>
    {props.buttons.map((el, ind) => {
      return <button
        key={el}
        onClick={() => props.handleClick(el)}
        value={el}
        >
        {el}
        </button>
    })
    }
  </div>
}

export default Buttons;