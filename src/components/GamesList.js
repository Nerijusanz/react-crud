import React, { Component } from 'react';


class GamesList extends Component {

  constructor(props){
    super(props);
    this.state = {
      games:props.games
    };
  }

  componentWillMount(){
    
    this.getMessage();
  }

  getMessage(){
    const emptyMessage = '<p>game list is empty</p>';

    const gamelist = '</p>game lits show here</p>';

    let message = (this.state.games.length ===0)?emptyMessage:gamelist;

    return message;
  }


  render() {

    let message = this.getMessage();

    return (
      <div>
      <h1>Games list</h1>
      {message}
      </div>
    );    
  }
}

export default GamesList;