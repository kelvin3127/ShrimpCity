import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { auth, handleUserProfile } from './firebase/utils';

//Layouts
import MainLayout from './Components/Layouts/MainLayout';

//Pages
import Homepage from './Components/Pages/Homepage/Homepage';
import Login from './Components/Pages/Login/Login';
import Register from './Components/Pages/Registration/Register';

const initialState = {
  currentUser: null
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot( snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      this.setState({
        ...initialState
      });
    });
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {

    const { currentUser } = this.state;
    return (
      <div className="App">
          <Switch>
            <Route exact path="/" render={() => (
              <MainLayout  currentUser={currentUser}>
                <Homepage/>
              </MainLayout>
            )}/>
            <Route path="/registration" 
              render={() =>  currentUser ? <Redirect to="/" /> :(
              <MainLayout  currentUser={currentUser}>
                <Register />
              </MainLayout>
            )}/>
            <Route path="/login" 
              render={() => currentUser ? <Redirect to="/" /> : (
                <MainLayout  currentUser={currentUser}>
                  <Login />
                </MainLayout>
            )}/>
          </Switch>   
      </div>
    );
  }
}

export default App;
