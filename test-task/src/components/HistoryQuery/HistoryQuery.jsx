import React from 'react';

import style from './HistoryQuery.module.scss';

const HistoryQuery = ({status, query}) => {
  return (
    <div className={style.HistoryQuery}>
      <div className={`${style['HistoryQuery-indicator']} ${style[`HistoryQuery-indicator--complete`]}`}></div>
      <div className={style['HistoryQuery-query']}>{query}action.ping</div>
      <div className={style['HistoryQuery-options']}>
        <div className={style['HistoryQuery-options-switcher']} />
        <div className={style['HistoryQuery-dropdown']}>
          <ul className={style['HistoryQuery-settings']}>
            <li className={`${style['HistoryQuery-settings-el']} ${style['HistoryQuery-settings-run']}`}>
              Выполнить
            </li>
            <li className={`${style['HistoryQuery-settings-el']} ${style['HistoryQuery-settings-copy']}`}>
              Скопировать
            </li>
            <li className={`${style['HistoryQuery-settings-el']} ${style['HistoryQuery-settings-delete']}`}>
              Удалить
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HistoryQuery;
