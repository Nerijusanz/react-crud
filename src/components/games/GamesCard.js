import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const cardBlock = (props) => {
  const txt = (
    <div className="ui card">
      <div className="image">
        <img src="https://via.placeholder.com/200x100" alt={props.game.title}/>
      </div>
      <div className="content">
        <a href className="header">{props.game.title}</a>
        <div className="description">{props.game.cover}</div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <Link to={`/games/edit/${props.game._id}`} className="ui basic button green">Edit</Link>
          <Link to={`/games/del/${props.game._id}`} className="ui basic button red">Delete</Link>
        </div>
      </div>
    </div>);

  return txt;
};


const GamesCard = (props) => {
  return cardBlock(props);
};
//  react propTypes
GamesCard.propTypes = {
  game: PropTypes.object.isRequired
};

export default GamesCard;
