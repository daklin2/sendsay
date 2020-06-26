import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import style from './Console.module.scss';

const Console = ({buttonState, logout, userLogin, userSubLogin}) => {
  const historyList = 'generatedWithRedux';

  const handlerLogout = () => {
    logout();
  }

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
        <div className={style['Console__body-title']}></div>
        <div className={style['Console__body-areas']}>
          <textarea
            className={`${style['Console__body-code']} ${style['Console__body-areas-el']}`}
          />
          <textarea readOnly="on" className={`${style['Console__body-response']} ${style['Console__body-areas-el']}`} />
        </div>
      </div>
      <div className={style.Console__footer}>
        <div className={style['Console__footer-container']}>
          <Button
            text="Отправить"
            isDisable={buttonState.isDisable}
            btnState={buttonState.state}
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
