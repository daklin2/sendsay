import Sendsay from 'sendsay-api';

import { setButtonState, setAlertMessage, setUserData, buttonActivitySwitch } from '../../redux/actions/creators/auth.creators';
import { ACTIVE, DISABLE, LOAD } from '../../constats/buttonState';

const signIn = (login, subLogin = '', password, dispatch) => {
  const promise = new Promise((resolve) => {
    resolve();
  });

  return (() =>
    promise
    .then(() => {
      dispatch(buttonActivitySwitch());
      dispatch(setButtonState(LOAD));
      dispatch(setAlertMessage(''));

      const sendsay = new Sendsay({
        auth: {
          login,
          subLogin,
          password,
        }
      })

      return sendsay.request({action: 'sys.settings.get', list: ['about.id']})
    })
    .then(() => {
      dispatch(setUserData(login, subLogin, password));
      dispatch(setButtonState(ACTIVE));
      dispatch(buttonActivitySwitch());
    })
    .catch(({id, explain}) => {
      dispatch(setAlertMessage(`{id: "${id}", explain: "${explain}"}`));
      dispatch(setButtonState(DISABLE));
    }))()
}

export default signIn;
