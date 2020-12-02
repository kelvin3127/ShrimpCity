import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from '../../redux/User/user.actions';

import Header from '../Widgets/Header/Header';
import SideNav from './../Widgets/SideNav/SideNav';
import Footer from '../Widgets/Footer/Footer';

const DashBoardLayout = props => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className="adminLayout">
      <Header {...props} />
      <div>
            <h1> Hello</h1>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;