import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from '../components/Navigation';
import Home from '../components/Home';
import Games from '../components/games/Games';
import GamesAdd from '../components/games/GamesAdd';
import GamesEdit from '../components/games/GamesEdit';
import GamesDelete from '../components/games/GamesDelete';
import Error from '../components/Error';

export default () => (
  <Router>
    <div>
      <Navigation />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/games/del/:id" component={GamesDelete} />
        <Route path="/games/edit/:id" component={GamesEdit} />
        <Route path="/games/add" component={GamesAdd} />
        <Route path="/games" component={Games} />
        <Route component={Error} />
      </Switch>
    </div>
  </Router>
);
