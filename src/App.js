import React from 'react';
import './App.css';
import SearchContainer from './components/SearchContainer/SearchContainer';
import SearchResult from './components/SearchResult/SearchResult'
import {Route, Switch, Redirect} from 'react-router-dom';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={SearchContainer} />
        <Route path="/search" component={SearchResult} />
        <Route path="/user/:user" component={Profile} />
        <Redirect to="/" />
        {/* <Route render={() => <h1 style={{color: 'red'}}>404 Not Found</h1>} /> */}
      </Switch>
    </div>
  );
}

export default App;
