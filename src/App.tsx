import React, { useState } from 'react';
import './App.css';
import './style/app.scss';
import AuthContext, { User } from './context/AuthContext';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Register from './pages/Register';
import Login from './pages/Login';
import Game from './pages/Game';
import Profile from './pages/Profile';
import ListUsers from './pages/ListUsers';
import NotFound from './pages/NotFound';


function App() {

  const [user, setUser] = useState<User>();
    // RUTAS PRIVADAS
    const PrivateRoute = ({ component: Component, ...rest }: any) => (
      <Route {...rest} render={(props: any) => (
        user
          ? <Component {...props} />
          : <Redirect to="/" />
      )} />
    )

  return (
    <>
     <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Switch>
           <Route exact path="/register" component={Register}/> 
           <Route exact path="/" component={Login}/>
           <PrivateRoute exact path="/game" component={Game}/>
           <PrivateRoute exact path="/profile" component={Profile}/>
           <PrivateRoute exact path="/users" component={ListUsers}/>
           <Route component={NotFound}></Route>
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>

    </>
  );
}

export default App;
