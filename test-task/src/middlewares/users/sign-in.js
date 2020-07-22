import Sendsay from 'sendsay-api';

import { setButtonState, loadButtonState } from '../../redux/actions/creators/button.creators';
import { setAlertMessage, setUserData } from '../../redux/actions/creators/auth.creators';
import { DISABLE } from '../../constats/buttonState';

const signIn = (login, subLogin = '', password, dispatch) => {
  const promise = new Promise((resolve) => {
    resolve();
  });

  return (() =>
    promise
      .then(() => {
        dispatch(loadButtonState(true));
        dispatch(setAlertMessage(''));

        const sendsay = new Sendsay({
          auth: {
            login,
            subLogin,
            password,
          },
        });

        return sendsay.request({ action: 'sys.settings.get', list: ['about.id'] });
      })
      .then(() => {
        dispatch(setUserData(login, subLogin, password));
        dispatch(loadButtonState(false));
      })
      .catch(({ id, explain }) => {
        dispatch(setAlertMessage(`{id: "${id}", explain: "${explain}"}`));
        dispatch(setButtonState(DISABLE));
      }))();
};

export default signIn;
