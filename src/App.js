import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

//Layouts
import MainLayout from './Components/Layouts/MainLayout';

//Pages
import Homepage from './Components/Pages/Homepage/Homepage';
import Register from './Components/Pages/Registration/Register';

const App = () => {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <MainLayout>
              <Homepage />
            </MainLayout>
          )}/>
          <Route path="/registration" render={() => (
            <MainLayout>
              <Register />
            </MainLayout>
          )}/>
        </Switch>   
    </div>
  );
}

export default App;
