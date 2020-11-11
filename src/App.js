import React, { useEffect } from 'react';

import './App.css';

//Routing, Redux and HOC
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './redux/User/user.actions';
import WithAuth from './HOC/withAuth';
import WithAdminAuth from './HOC/withAdminAuth';

//Layouts
import MainLayout from './Components/Layouts/MainLayout';

//Pages
import Homepage from './Components/Pages/Homepage/Homepage';
import Login from './Components/Pages/Login/Login';
import Register from './Components/Pages/Registration/Register';
import Recovery from './Components/Pages/Recovery/Recovery';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Admin from './Components/Pages/Admin/Admin';


const App = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());

  }, [])

    return (
      <div className="App">
          <Switch>
            <Route exact path="/" render={() => (
              <MainLayout >
                <Homepage/>
              </MainLayout>
            )}/>
            <Route path="/registration" 
              render={() => (
              <MainLayout >
                <Register />
              </MainLayout>
            )}/>
            <Route path="/login" 
              render={() => (
                <MainLayout >
                  <Login />
                </MainLayout>
            )}/>
            <Route path="/recovery" 
              render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )}/>
            <Route path="/admin" 
              render={() => (
              <WithAdminAuth>
                <MainLayout>
                  <Admin />
                </MainLayout>
              </WithAdminAuth>
            )}/>
            <Route path="/dashboard" 
              render={() => (
                <WithAuth>
                  <MainLayout>
                    <Dashboard/>
                  </MainLayout>
              </WithAuth>
            )}/>
          </Switch>   
      </div>
    );
}

export default App;
