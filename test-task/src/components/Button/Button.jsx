import React from 'react';
import PropTypes from 'prop-types';

import style from './Button.module.scss';

const Button = ({ text, isDisable, buttonState, onClick, buttonLoadClass }) => {
  const creatLoader = () => {
    const elements = [];
    for (let i = 0; i <= 12; i += 1) {
      elements.push(<div key={i} />);
    }
    return elements;
  };

  const btnContent =
    buttonState !== buttonLoadClass ? (
      text
    ) : (
      <div className={style[`Button-loader`]}>{creatLoader()}</div>
    );

  return (
    <button
      className={`${style.Button} ${style[`Button${buttonState}`]}`}
      type="submit"
      disabled={isDisable}
      onClick={onClick}
    >
      {btnContent}
    </button>
  );
};

Button.defaultProps = {
  text: 'Кнопка',
  isDisable: false,
  onClick: null,
};

Button.propTypes = {
  text: PropTypes.string,
  isDisable: PropTypes.bool,
  onClick: PropTypes.func,
  buttonLoadClass: PropTypes.string.isRequired,
  buttonState: PropTypes.string.isRequired,
};

export default Button;
