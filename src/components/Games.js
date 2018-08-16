import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import GamesList from './GamesList';

class Games extends Component {
  render() {
    return (
      <div>
        <h1>Games</h1>
        <GamesList games={this.props.games}/>
      </div>

    );    
  }
}


Games.propTypes = {
  games: PropTypes.array.isRequired
}

//get reducers state
function mapStateToProps(state){
  return{
    games: state.games
  }
}

export default connect(mapStateToProps)(Games);