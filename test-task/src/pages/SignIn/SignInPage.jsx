import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import style from './SignInPage.module.scss';
import Logo from '../../components/Logo';

const SignInPage = ({
  sign,
  buttonState,
  message,
  switchButton,
  setButtonState,
  loadButtonState,
  activeButtonState,
}) => {
  const [login, setLogin] = useState('');
  const [subLogin, setSubLogin] = useState('');
  const [password, setPassword] = useState('');

  const enableSubmit = () => {
    if (buttonState.state !== loadButtonState && buttonState.isDisable) {
      switchButton();
      setButtonState(activeButtonState);
    }
  };

  const handlerOnTypeSetLogin = ({ target: { value } }) => {
    enableSubmit();

    const regExpPassword = /[а-яё ]/iu.test(value);
    if (!regExpPassword) {
      setLogin(value);
    }
  };

  const handlerOnTypeSetSubLogin = ({ target: { value } }) => {
    const regExpPassword = /[а-яё ]/iu.test(value);
    if (!regExpPassword) {
      setSubLogin(value);
    }
  };

  const handlerOnTypeSetPassword = ({ target: { value } }) => {
    enableSubmit();

    const regExpPassword = /[а-яё ]/iu.test(value);
    if (!regExpPassword) {
      setPassword(value);
    }
  };

  const handlerSubmit = (event) => {
    event.preventDefault();

    // не эфективно, заменить
    event.target
      .closest('form')
      .querySelectorAll('input')
      .forEach((el) => el.removeAttribute('readonly'));

    return sign(login, subLogin, password);
  };

  const errorElement = () => {
    return (
      message && (
        <div className={style.Authorization__error}>
          <span className={style['Authorization__error-title']}>Вход не вышел</span>
          <span className={style['Authorization__error-type']}>{message}</span>
        </div>
      )
    );
  };

  return (
    <div className={style['Page-container']}>
      <Logo />
      <div className={style.Authorization}>
        <div className={style.Authorization__title}>API-Консолька</div>
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
              readOnly="on"
              onFocus={(ev) => ev.target.removeAttribute('readonly')}
              onChange={handlerOnTypeSetLogin}
            />
          </div>
          <div className={style['Authorization__form-container']}>
            <div className={style['Authorization__form-title']}>
              Сублогин
              <span className={style['Authorization__form-note']}>опционально</span>
            </div>
            <input
              value={subLogin}
              className={style['Authorization__form-input']}
              id="SubLogin"
              placeholder="Сублогин (опционально)"
              autoComplete="off"
              name="SubLogin"
              readOnly="on"
              onFocus={(ev) => ev.target.removeAttribute('readonly')}
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
              readOnly="on"
              onFocus={(ev) => ev.target.removeAttribute('readonly')}
              onChange={handlerOnTypeSetPassword}
            />
          </div>
          <Button text="Войти" />
        </form>
      </div>
    </div>
  );
};

SignInPage.defaultProps = {
  message: null,
  loadButtonState: null,
  activeButtonState: null,
};

SignInPage.propTypes = {
  sign: PropTypes.func.isRequired,
  buttonState: PropTypes.oneOfType([PropTypes.object]).isRequired,
  message: PropTypes.string,
  switchButton: PropTypes.func.isRequired,
  setButtonState: PropTypes.func.isRequired,
  loadButtonState: PropTypes.string,
  activeButtonState: PropTypes.string,
};

export default SignInPage;
