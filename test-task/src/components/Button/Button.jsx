import React from 'react';
import PropTypes from 'prop-types';

import style from './Button.module.scss';

const Button = ({ handlerClick, text, isDisable, classBtn }) => {

  return (
    <button
      className={`${classBtn} ${style.button}`}
      onClick={handlerClick}
      variant="contained"
      type='button'
      disabled={isDisable}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  handlerClick: () => {},
  classBtn: '',
  isDisable: false,
};

Button.propTypes = {
  handlerClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  isDisable: PropTypes.bool,
  classBtn: PropTypes.string,
};

export default Button;
