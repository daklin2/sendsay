import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import HistoryQuery from '../../components/HistoryQuery';
import style from './Console.module.scss';
import Logo from '../../components/Logo';

const Console = ({
  buttonLoad,
  logout,
  userLogin,
  userSubLogin,
  userAuth,
  fetchQuery,
  historyQueries,
  setQueries,
  clearQuery,
}) => {
  const [consoleJSON, setConsoleJSON] = useState('');
  const [responseJSON, setResponseJSON] = useState('');
  const [isFullscreen, setFullscreen] = useState(false);
  const [isJSONError, setJSONError] = useState(false);
  const [isResponseError, setResponseError] = useState(false);

  const latestConsoleJSON = useRef(consoleJSON);

  const parseJson = () => {
    const parseUserJSON = JSON.parse(latestConsoleJSON.current.replace("'", '"'));
    return JSON.stringify(parseUserJSON, null, 2);
  };

  const handlerCLickFullScreen = () => {
    const openFullscreen = (doc) => {
      if (doc.requestFullscreen) {
        doc.requestFullscreen();
      }
    };

    const closeFullscreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    };

    const doc = document.documentElement;
    if (!document.fullscreenElement) {
      openFullscreen(doc);
    } else {
      closeFullscreen(doc);
    }

    document.onfullscreenchange = () => {
      if (document.fullscreenElement) {
        setFullscreen(true);
      } else {
        setFullscreen(false);
      }
    };
  };

  const handlerClickClearHistory = () => {
    clearQuery();
  };

  const handlerOnChangeConsole = ({ target: { value } }) => {
    if (isJSONError) {
      setJSONError(false);
    }

    setConsoleJSON(value);
  };

  const handlerClickFormatJson = () => {
    try {
      setConsoleJSON(parseJson());
    } catch (error) {
      console.error(error);
    }
  };

  const handlerClickButton = () => {
    buttonLoad(true);
    try {
      const query = JSON.parse(parseJson());
      const { action } = query;

      const preparedQueryToHistory = {
        action,
        query,
      };

      fetchQuery(userAuth, query)
        .then((res) => {
          preparedQueryToHistory.status = true;
          setQueries(preparedQueryToHistory);

          setResponseJSON(JSON.stringify(res, null, 2));
          setResponseError(false);
          buttonLoad(false);
        })
        .catch((err) => {
          preparedQueryToHistory.status = false;
          if (action) {
            setQueries(preparedQueryToHistory);
          }

          setResponseJSON(JSON.stringify(err, null, 2));
          setResponseError(true);
          buttonLoad(false);
        });
    } catch (err) {
      buttonLoad(false);
      setJSONError(true);
    }
  };

  const handlerLogout = () => {
    clearQuery();
    logout();
  };

  const performQuery = (query) => {
    setConsoleJSON(JSON.stringify(query, null, 2));
    latestConsoleJSON.current = JSON.stringify(query, null, 2);

    return handlerClickButton();
  };

  useEffect(() => {
    const bar = document.querySelector(`.${style['Console__body-split']}`);
    const left = document.querySelector(`.${style['Console__body-code']}`);
    let mouseIsDown = false;

    bar.addEventListener('mousedown', () => {
      mouseIsDown = true;
    });

    document.addEventListener('mousemove', (e) => {
      if (!mouseIsDown) return;

      left.style.width = `${e.clientX}px`;
    });

    document.addEventListener('mouseup', () => {
      mouseIsDown = false;
    });
  }, []);

  useEffect(() => {
    latestConsoleJSON.current = consoleJSON;
  }, [consoleJSON]);

  const fullscreenElementsClasses = classNames({
    [style['Console__header-fullscreen--true']]: !isFullscreen,
    [style['Console__header-fullscreen--false']]: isFullscreen,
  });

  const consoleCodeClasses = classNames(
    style['Console__body-code'],
    style['Console__body-areas-el'],
    {
      [style['Console__body-code--wrong']]: isJSONError,
    }
  );
  const consoleResponseClasses = classNames(
    style['Console__body-response'],
    style['Console__body-areas-el'],
    {
      [style['Console__body-response--wrong']]: isResponseError,
    }
  );

  return (
    <div className={style.Console}>
      <div className={style.Console__header}>
        <div className={style['Console__header-rightcontainer']}>
          <Logo />
          <div className={style['Console__header-title']}>API-консолька</div>
        </div>
        <div className={style['Console__header-leftcontainer']}>
          <div
            className={`${style['Console__header-userdata']} ${style['Console__header-container-el']}`}
          >
            <span className={style['Console__header-login']}>{userLogin}</span>
            {userSubLogin !== '' && (
              <span className={style['Console__header-sublogin']}>{userSubLogin}</span>
            )}
          </div>
          <div
            className={`${style['Console__header-logout']} ${style['Console__header-container-el']}`}
            onClick={handlerLogout}
          >
            Выйти
          </div>
          <div
            className={`${style['Console__header-fullscreen']} ${style['Console__header-container-el']}`}
            onClick={handlerCLickFullScreen}
            tabIndex={0}
          >
            <span className={fullscreenElementsClasses} />
            <span className={fullscreenElementsClasses} />
            <span className={fullscreenElementsClasses} />
            <span className={fullscreenElementsClasses} />
          </div>
        </div>
      </div>
      <div className={style.Console__query}>
        <div className={style['Console__query-history']}>
          {historyQueries.map((query, i) => (
            <HistoryQuery key={query.action} index={i} query={query} performQuery={performQuery} />
          ))}
        </div>
        <div className={style['Console__query-clear']} onClick={handlerClickClearHistory} />
      </div>
      <div className={style.Console__body}>
        <div className={`${style['Console__body-areas']}`}>
          <div className={consoleCodeClasses}>
            <div className={style['Console__body-title']}>Запрос:</div>
            <textarea
              className={`${style['Console__body-textarea']}`}
              onChange={handlerOnChangeConsole}
              value={consoleJSON}
            />
          </div>
          <div className={style['Console__body-split']}>
            <div className={style['Console__body-split--view']} />
          </div>
          <div className={consoleResponseClasses}>
            <div className={style['Console__body-title']}>Ответ:</div>
            <textarea
              className={`${style['Console__body-textarea']}`}
              readOnly="on"
              value={responseJSON}
            />
          </div>
        </div>
      </div>
      <div className={style.Console__footer}>
        <div className={style['Console__footer-container']}>
          <Button text="Отправить" onClick={handlerClickButton} />
          <a
            href="https://github.com/daklin2"
            className={style['Console__footer-github']}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <div
            className={style['Console__footer-format']}
            onClick={handlerClickFormatJson}
            tabIndex={0}
          >
            <svg
              className={style['Console__footer-format--img']}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path d="M21 10H7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 6H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 14H7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 18H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            Форматировать
          </div>
        </div>
      </div>
    </div>
  );
};

Console.defaultProps = {
  historyQueries: [],
  userSubLogin: '',
};

Console.propTypes = {
  historyQueries: PropTypes.oneOfType([PropTypes.array]),
  userSubLogin: PropTypes.string,
  buttonLoad: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  userLogin: PropTypes.string.isRequired,
  userAuth: PropTypes.oneOfType([PropTypes.object]).isRequired,
  fetchQuery: PropTypes.func.isRequired,
  setQueries: PropTypes.func.isRequired,
  clearQuery: PropTypes.func.isRequired,
};

export default Console;
