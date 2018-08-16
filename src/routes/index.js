import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import Navigation from '../components/Navigation';
import Home from '../components/Home';
import Games from '../components/Games';
import Error from '../components/Error';

export default () =>(
    <Router>
        <div>
            <Navigation/>
            <Switch>    
                <Route path="/" component={Home} exact />
                <Route path="/games" component={Games} />
                <Route component={Error} />   
            </Switch>
        </div>
    </Router>
);
