// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import ArticlePage from './components/ArticlePage';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/articles/:filename" component={ArticlePage} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
