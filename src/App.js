import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions'
import { connect } from 'react-redux';

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
import withAuth from './HOC/withAuth';


const App = (props) => {

  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    
    const authListener = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot( snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth)
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
