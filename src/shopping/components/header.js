import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import * as helper from '../helpers/authentication';
import * as action from '../pages/login/actions/index';
import * as reselect from '../pages/login/reselect/login-reselect';
import { createStructuredSelector } from 'reselect';

const { Header } = Layout;

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const countCarts = useSelector(state => state.cart.countItems);
  const { token } = useSelector(createStructuredSelector({
    token: reselect.getTokenLogin
  }));

  const { pathname } = useLocation();
  const user = helper.getUsernameUser(token);

  const logout = () => {
    dispatch(action.logoutRequest());
  }

  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={pathname}>
        <Menu.Item key="/home">
          <NavLink to="/home">Home</NavLink>
        </Menu.Item>
        <Menu.Item key="/cart">
          <NavLink to="/cart">Cart ( {countCarts} )</NavLink>
        </Menu.Item>
        <Menu.Item>
          Hi : {user}
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => logout()}>Log out</Button>
        </Menu.Item>
        <Menu.Item key="/login">
          <NavLink to="/login">Login</NavLink>
        </Menu.Item>
      </Menu>
    </Header>
  )
}
export default React.memo(HeaderComponent);