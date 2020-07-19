import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import HistoryQuery from '../../components/HistoryQuery';
import style from './Console.module.scss';

const Console = ({buttonState, logout, userLogin, userSubLogin}) => {
  const [consoleJSON, setConsoleJSON] = useState('');
  const historyList = <HistoryQuery/>;

  const handlerOnChangeConsole = ({target: {value}}) => {
    setConsoleJSON(value)
  }

  const handlerButtonClick = () => {
    try {

    } catch (error) {
      console.log(error)
    }
    const parseUserJSON = JSON.parse(consoleJSON);
    setConsoleJSON(JSON.stringify(parseUserJSON, null, 2));
  }

  const handlerLogout = () => {
    logout();
  }

  useEffect(() => {
    const bar = document.querySelector(`.${style['Console__body-split']}`);
    const left = document.querySelector(`.${style['Console__body-code']}`);
    let mouse_is_down = false;

    bar.addEventListener('mousedown', (e) => {
      mouse_is_down = true;
    })

    document.addEventListener('mousemove', (e) => {
      if (!mouse_is_down) return;

      left.style.width = `${e.clientX}px`;
    })

    document.addEventListener('mouseup', () => {
      mouse_is_down = false;
    })
  }, [])

  return (
    <div className={style.Console}>
      <div className={style.Console__header}>
        <div className={style['Console__header-title']}>API-консолька</div>
        <div className={style['Console__header-container']}>
          <div className={`${style['Console__header-userdata']} ${style['Console__header-container-el']}`}>
            <span className={style['Console__header-login']}>{userLogin}</span>
            {userSubLogin !== '' && <span className={style['Console__header-sublogin']}>{userSubLogin}</span>}
          </div>
          <div
            className={`${style['Console__header-logout']} ${style['Console__header-container-el']}`}
            onClick={handlerLogout}>
            Выйти
          </div>
          <div className={`${style['Console__header-fullscreen']} ${style['Console__header-container-el']}`}></div>
        </div>
      </div>
      <div className={style.Console__query}>
        <div className={style['Console__query-history']}>
          {historyList}
        </div>
        <div className={style['Console__query-clear']}></div>
      </div>
      <div className={style.Console__body}>
        <div className={`${style['Console__body-areas']}`}>
          <div className={`${style['Console__body-code']} ${style['Console__body-areas-el']}`}>
            <div className={style['Console__body-title']}>Запрос:</div>
            <textarea
              className={`${style['Console__body-textarea']}`}
              onChange={handlerOnChangeConsole}
            />
          </div>
          <div className={style['Console__body-split']}>
            <div className={style['Console__body-split--view']}/>
          </div>
          <div className={`${style['Console__body-response']} ${style['Console__body-areas-el']}`}>
            <div className={style['Console__body-title']}>Ответ:</div>
            <textarea
              className={`${style['Console__body-textarea']}`}
              readOnly="on"
              value={consoleJSON}
            />
          </div>
        </div>
      </div>
      <div className={style.Console__footer}>
        <div className={style['Console__footer-container']}>
          <Button
            text="Отправить"
            isDisable={buttonState.isDisable}
            btnState={buttonState.state}
            onClick={handlerButtonClick}
          />
          <a href='https://github.com/daklin2'
             className={style['Console__footer-github']}
             target='_blank'
          >
            GitHub
          </a>
          <div className={style['Console__footer-format']}>Форматировать</div>
        </div>
      </div>
    </div>
  )
}

Console.defaultProps = {

}

Console.propTypes = {
  buttonState: PropTypes.PropTypes.oneOfType([PropTypes.object]).isRequired,
}
export default Console;
