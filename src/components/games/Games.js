import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGames } from '../../actions/gamesActions';

import GamesList from './GamesList';


class Games extends Component {
  componentDidMount() {
    // eslint-disable-next-line
    this.props.fetchGames();
  }

  getGames() {
    return this.props.gamesReducer.games;
  }


  render() {
    return (
      <div>
        <h1>Games</h1>
        <Link to='/games/add'>Add Game</Link>
        <GamesList games={this.getGames()} />
      </div>

    );
  }
}

// react propTypes
Games.propTypes = {
  gamesReducer: PropTypes.object.isRequired,
  fetchGames: PropTypes.func.isRequired,
};

// redux reducers
const mapStateToProps = state => ({

  gamesReducer: state.gamesReducer,

});

export default connect(mapStateToProps, { fetchGames })(Games);
