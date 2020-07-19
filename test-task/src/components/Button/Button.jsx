import React from 'react';
import PropTypes from 'prop-types';

import style from './Button.module.scss';
import { LOAD } from '../../constats/buttonState';

const Button = ({ text, isDisable, btnState, onClick }) => {
  const creatLoader = () => {
    const elements = [];
    for (let i = 0; i <= 12; i += 1) {
      elements.push(<div key={i}/>);
    }
    return elements;
  }

  const btnContent = btnState !== LOAD
    ? text
    : (
      <div className={style[`Button-loader`]}>
        {creatLoader()}
      </div>
    )

  return (
    <button
      className={`${style.Button} ${style[`Button${btnState}`]}`}
      type='submit'
      disabled={isDisable}
      onClick={onClick}
    >
      {btnContent}
    </button>
  );
};

Button.defaultProps = {
  classBtn: '',
  isDisable: false,
  isLoad: null,
  onClick: null,
};

Button.propTypes = {
  isLoad: PropTypes.string,
  text: PropTypes.string.isRequired,
  isDisable: PropTypes.bool,
  onClick:PropTypes.func,
  classBtn: PropTypes.string,
};

export default Button;
