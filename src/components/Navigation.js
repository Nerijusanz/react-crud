import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <div className="ui two item menu">
    <Link className="item" activeclassname="active" activeonlywhenexact="true" to="/">Home</Link>
    <Link className="item" activeclassname="active" activeonlywhenexact="true" to="/games">Games</Link>
  </div>
);

export default Navigation;
