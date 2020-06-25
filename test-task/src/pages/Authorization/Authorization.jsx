import React from 'react';

import Button from '../../components/Button';
import styles from './Authorization.module.scss';

const Authorization = () => {

  return (
    <div className={styles.Authorization}>
      <div className={styles.Authorization__title}>
        API-Консолька
      </div>
      <div className={styles.Authorization__error}></div>
      <form className={styles.Authorization__form}>
        <div className={styles['Authorization__form-container']}>
          <div className={styles['Authorization__form-title']}>Логин</div>
          <input
            required
            className={styles['Authorization__form-input']}
            id="Login"
            placeholder="Логин"
            name="email"
            autoComplete="off"
          />
        </div>
        <div className={styles['Authorization__form-container']}>
          <div className={styles['Authorization__form-title']}>
            Сублогин
            <span className={styles['Authorization__form-note']}>
              опционально
            </span>
          </div>
          <input
            className={styles['Authorization__form-input']}
            id="SubLogin"
            placeholder="Сублогин (опционально)"
            autoComplete="off"
            name="SubLogin"
          />
        </div>
        <div className={styles['Authorization__form-container']}>
          <div className={styles['Authorization__form-title']}>Пароль</div>
          <input
            required
            className={styles['Authorization__form-input']}
            name="password"
            placeholder="Пароль"
            type="password"
            id="password"
            autoComplete="off"
          />
        </div>
        <Button
          classBtn={styles['Authorization__form-button']}
          text="Войти"
        />
      </form>
    </div>
  );
};

export default Authorization;
