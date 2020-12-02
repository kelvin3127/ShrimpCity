import React from 'react';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from '../../redux/User/user.actions';

import Header from './../Widgets/Header/Header';
import SideNav from './../Widgets/SideNav/SideNav';
import Footer from './../Widgets/Footer/Footer';
import './adminlayout.css';


const AdminLayout = props => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div >
      <Header {...props} />
      <div className="container-fluid">
          <div className="row">
          <div className="m-4">
            <SideNav className="col">
                

               

            </SideNav>
            </div>
            <div className="line"></div>
            <div className="col">
                <div className="container">
                    {props.children}
                </div>  
            </div>  
          </div>

      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;