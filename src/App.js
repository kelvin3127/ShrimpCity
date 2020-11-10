import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions'
import { connect } from 'react-redux';
//Layouts
import MainLayout from './Components/Layouts/MainLayout';

//Pages
import Homepage from './Components/Pages/Homepage/Homepage';
import Login from './Components/Pages/Login/Login';
import Register from './Components/Pages/Registration/Register';
import Recovery from './Components/Pages/Recovery/Recovery';


class App extends Component {

  authListener = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    this.authListener = auth.onAuthStateChanged( async userAuth => {
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
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {

    const { currentUser } = this.props;
    return (
      <div className="App">
          <Switch>
            <Route exact path="/" render={() => (
              <MainLayout >
                <Homepage/>
              </MainLayout>
            )}/>
            <Route path="/registration" 
              render={() =>  currentUser ? <Redirect to="/" /> :(
              <MainLayout >
                <Register />
              </MainLayout>
            )}/>
            <Route path="/login" 
              render={() => currentUser ? <Redirect to="/" /> : (
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
          </Switch>   
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
