import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GamesCard from './GamesCard';


class GamesList extends Component {

  renderGamesCardList() {

    if (this.props.games.length === 0) {
      return <p>list is empty</p>;
    }
    // if game list not empty
    const list = this.props.games.map(game => <GamesCard game={game} key={game._id} />);

    const out = <div className="ui four cards">{list}</div>;
    return out;
  }

  render() {
    return (
      <div>
        <h1>Games list</h1>
        {this.renderGamesCardList()}
      </div>
    );
  }
}

// react propTypes
GamesList.propTypes = {
  games: PropTypes.array.isRequired
};

export default GamesList;
