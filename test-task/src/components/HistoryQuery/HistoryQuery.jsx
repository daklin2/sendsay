import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './HistoryQuery.module.scss';

const HistoryHistory = ({ deleteQuery, index, query, performQuery }) => {
  const [dropdownDisplay, setDropdownDisplay] = useState(false);
  const [optionEnter, setOptionEnter] = useState(false);
  const [dropdownEnter, setDropdownEnter] = useState(false);
  const [clientPos, setClientPos] = useState({ right: 0 });
  const [isCopy, setIsCopy] = useState(false);

  const latestOptionEnter = useRef(optionEnter);
  const latestDropdownEnter = useRef(dropdownEnter);

  const handlerMouseEventOption = ({ type, clientX }) => {
    if (type === 'mouseenter') {
      setClientPos({ right: clientX - 80, top: 90 });
      setOptionEnter(true);
      setDropdownDisplay(true);
    } else {
      setOptionEnter(false);

      setTimeout(() => {
        if (!latestDropdownEnter.current && !latestOptionEnter.current) {
          setDropdownDisplay(false);
        }
      }, 50);
    }
  };

  const handlerMouseEventDropdown = ({ type }) => {
    if (type === 'mouseenter') {
      setDropdownEnter(true);
    } else {
      setDropdownEnter(false);
      setDropdownDisplay(false);
    }
  };

  const handlerClickDelete = () => {
    deleteQuery(index);
    setDropdownDisplay(false);
  };

  const handlerClickRun = () => {
    performQuery(query.query);
    setDropdownDisplay(false);
  };

  const handlerClickCopy = () => {
    navigator.clipboard
      .writeText(JSON.stringify(query.query, null, 2))
      .then(() => {
        setIsCopy(true);
        setTimeout(() => {
          setIsCopy(false);
        }, 1000);
      })
      .catch(() => {});
  };

  useEffect(() => {
    latestDropdownEnter.current = dropdownEnter;
    latestOptionEnter.current = optionEnter;
  }, [dropdownEnter, optionEnter]);

  const historyQueryClasses = classNames(style['History-query'], {
    [style['History-query--copy']]: isCopy,
  });

  const statusClasses = classNames(style['History-indicator'], {
    [style[`History-indicator--complete`]]: query.status,
    [style[`History-indicator--error`]]: !query.status,
  });

  const dropdownClasses = classNames(style['History-dropdown'], {
    [style['History-dropdown--display']]: dropdownDisplay,
  });

  return (
    <div>
      <div className={style.History}>
        <div className={statusClasses} />
        <div className={historyQueryClasses}>{isCopy ? 'Скопироавно' : query.action}</div>
        <div
          className={style['History-options']}
          onMouseLeave={handlerMouseEventOption}
          onMouseEnter={handlerMouseEventOption}
        >
          <div className={style['History-options-switcher']} />
        </div>
      </div>
      <div
        className={dropdownClasses}
        onMouseLeave={handlerMouseEventDropdown}
        onMouseEnter={handlerMouseEventDropdown}
        style={{ left: `${clientPos.right}px` }}
      >
        <ul className={style['History-settings']}>
          <li
            className={`${style['History-settings-el']} ${style['History-settings-run']}`}
            onClick={handlerClickRun}
          >
            Выполнить
          </li>
          <li
            className={`${style['History-settings-el']} ${style['History-settings-copy']}`}
            onClick={handlerClickCopy}
          >
            Скопировать
          </li>
          <li
            className={`${style['History-settings-el']} ${style['History-settings-delete']}`}
            onClick={handlerClickDelete}
          >
            Удалить
          </li>
        </ul>
      </div>
    </div>
  );
};

HistoryHistory.defaultProps = {
  performQuery: () => null,
};

HistoryHistory.propTypes = {
  performQuery: PropTypes.func,
  index: PropTypes.number.isRequired,
  query: PropTypes.oneOfType([PropTypes.object]).isRequired,
  deleteQuery: PropTypes.func.isRequired,
};

export default HistoryHistory;
