import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import SearchContainer from './components/SearchContainer/SearchContainer';
import SearchResult from './components/SearchResult/SearchResult'
import Profile from './components/Profile/Profile';
import About from './components/About/About';

function App() {
  return (
    <div>
      <SearchContainer />
      <Switch>
        <Route path="/" exact component={About} />
        <Route path="/search" exact component={SearchResult} />
        <Route path="/user/:user" exact component={Profile} />
        <Redirect to="/" />
        {/* <Route render={() => <h1 style={{color: 'red'}}>404 Not Found</h1>} /> */}
      </Switch>
    </div>
  );
}

export default App;
