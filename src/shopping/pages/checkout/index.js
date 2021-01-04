import React from 'react';
import ConfirmComponent from './components/confirm';
import CheckOutComponent from './components/checkout';
import * as helpers from '../../helpers/authentication';
import * as reselect from '../login/reselect/login-reselect';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import LayoutComponent from '../../components/layout';

const AppCheckout = () => {
  const { token } = useSelector(createStructuredSelector({
    token: reselect.getTokenLogin
  }));
  const chkLogin = helpers.isLogin(token);

  return (
    <>
      <LayoutComponent>
      { chkLogin
          ? 
        (<ConfirmComponent/>) 
          : 
        (<CheckOutComponent/>)
      }
      </LayoutComponent>
    </>
  )
}
export default React.memo(AppCheckout);