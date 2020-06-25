import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import style from './Authorization.module.scss';

const Authorization = ({sign, buttonState, message, switchButton, setButtonState, loadButtonState, activeButtonState}) => {
  const [login, setLogin] = useState('');
  const [subLogin, setSubLogin] = useState('');
  const [password, setPassword] = useState('');

  const enableSubmit = () => {
    if (buttonState.state !== loadButtonState && buttonState.isDisable) {
      switchButton();
      setButtonState(activeButtonState)
    }
  }

  const handlerOnTypeSetLogin = ({target: {value}}) => {
    enableSubmit();

    const regExpPassword = /[а-яё ]/iu.test(value);
    !regExpPassword && setLogin(value);
  }

  const handlerOnTypeSetSubLogin = ({target: {value}}) => {
    const regExpPassword = /[а-яё ]/iu.test(value);
    !regExpPassword && setSubLogin(value);
  }

  const handlerOnTypeSetPassword = ({target: {value}}) => {
    enableSubmit();

    const regExpPassword = /[а-яё ]/iu.test(value);
    !regExpPassword && setPassword(value);
  }

  const handlerSubmit = (event) => {
    event.preventDefault();
    return sign(login, subLogin, password);
  };

  const errorElement = () => {
    return message && (
      <div className={style.Authorization__error}>
        <span className={style['Authorization__error-title']}>Вход не вышел</span>
        <span className={style['Authorization__error-type']}>{message}</span>
      </div>
    )
  }

  const buttonActiveClass = `Authorization__form-button${buttonState.state}`;

  return (
    <div className={style.Authorization}>
      <div className={style.Authorization__title}>
        API-Консолька
      </div>
      {errorElement()}
      <form onSubmit={handlerSubmit} className={style.Authorization__form}>
        <div className={style['Authorization__form-container']}>
          <div className={style['Authorization__form-title']}>Логин</div>
          <input
            required
            value={login}
            className={style['Authorization__form-input']}
            id="Login"
            placeholder="Логин"
            name="email"
            autoComplete="off"
            onChange={handlerOnTypeSetLogin}
          />
        </div>
        <div className={style['Authorization__form-container']}>
          <div className={style['Authorization__form-title']}>
            Сублогин
            <span className={style['Authorization__form-note']}>
              опционально
            </span>
          </div>
          <input
            value={subLogin}
            className={style['Authorization__form-input']}
            id="SubLogin"
            placeholder="Сублогин (опционально)"
            autoComplete="off"
            name="SubLogin"
            onChange={handlerOnTypeSetSubLogin}
          />
        </div>
        <div className={style['Authorization__form-container']}>
          <div className={style['Authorization__form-title']}>Пароль</div>
          <input
            required
            value={password}
            className={style['Authorization__form-input']}
            name="password"
            placeholder="Пароль"
            type="password"
            id="password"
            autoComplete="off"
            onChange={handlerOnTypeSetPassword}
          />
        </div>
        <Button
          classBtn={`${style['Authorization__form-button']} ${style[buttonActiveClass]}`}
          text="Войти"
          isDisable={buttonState.isDisable}
          isLoad={buttonState.state}
        />
      </form>
    </div>
  );
};

Authorization.defaultProps = {
  message: null,
  loadButtonState: null,
  activeButtonState: null,
}

Authorization.propTypes = {
  sign: PropTypes.func.isRequired,
  buttonState: PropTypes.oneOfType([PropTypes.object]).isRequired,
  message: PropTypes.string,
  switchButton: PropTypes.func.isRequired,
  setButtonState: PropTypes.func.isRequired,
  loadButtonState: PropTypes.string,
  activeButtonState: PropTypes.string,

}
export default Authorization;
