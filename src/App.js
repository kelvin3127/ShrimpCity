import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { auth, handleUserProfile } from './firebase/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from './redux/User/user.actions';

//HOC
import WithAuth from './HOC/withAuth';
//Layouts
import MainLayout from './Components/Layouts/MainLayout';

//Pages
import Homepage from './Components/Pages/Homepage/Homepage';
import Login from './Components/Pages/Login/Login';
import Register from './Components/Pages/Registration/Register';
import Recovery from './Components/Pages/Recovery/Recovery';
import Dashboard from './Components/Pages/Dashboard/Dashboard';


const App = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    const authListener = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot( snapshot => {
          dispatch(setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          }))
        })
      }
      dispatch(setCurrentUser(userAuth))
    });

    return () => {
      authListener()
    }
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
