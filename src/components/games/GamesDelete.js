import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchGameById,deleteGame} from '../../actions/gamesActions';


import classnames from 'classnames';

class GamesDelete extends Component {

  state = {
    id:null,  //fld id
    title:'', //fld input title value
    cover:'',   //fld input cover value
    errors:{},//errors.server  errors.validation
    loading:false,
    redirect:false
  };

  componentDidMount(){
    
    if(this.props.match.params.id !== undefined)
      this.props.fetchGameById(this.props.match.params.id);
      
  }


  componentWillReceiveProps(newProps){

    let gameObj = newProps.gamesReducer;
    
    let loading = (this.state.loading !== gameObj.loading)?gameObj.loading:this.state.loading;
    let redirect = (this.state.redirect !== gameObj.done)?gameObj.done:this.state.redirect;
    

    let id = (gameObj.game._id !== undefined)?gameObj.game._id: this.state.id;
    let title = (gameObj.game.title !== undefined)?gameObj.game.title: this.state.title;
    let cover = (gameObj.game.cover !== undefined)?gameObj.game.cover: this.state.cover;

    let errors={};

    if(gameObj.errors.server !== undefined)
      errors.server = gameObj.errors.server;
       
  
    this.setState({
      id:id,
      title:title,
      cover:cover,
      loading:loading,
      errors:errors,
      redirect:redirect
    });

  }


  handleSubmit = (e)=>{
    e.preventDefault();

    if(!this.props.match.params.id)
        return; //make server error


    let conf = window.confirm('are you sure, to delete game?');

    if(conf)
        this.props.deleteGame(this.props.match.params.id); 
  
  }

  renderRedirect = () => {
    //if game is added, GameReducer state.done==true, and  do redirect to game list
    if (this.state.redirect) 
      return <Redirect to="/games" />
    
  }


  render(){

    const server_errors = (this.state.errors.server)? <div className="ui negative message"><p>{this.state.errors.server}</p></div> : '';


    const img = <div className="field"><img src="https://via.placeholder.com/150x150" alt="cover" className="ui small bordered image"/></div>;
    const cover_img =(this.state.cover !=='')?img:null;
      
    return (
      <div>

        {this.renderRedirect()}

        <h1>Game Delete</h1>
            {server_errors}
          
          <form className={classnames('ui','form',{loading:this.state.loading})} onSubmit={this.handleSubmit}>
            
            <div className="field">
                <label>title:</label>
                <p>{this.state.title}</p>
            </div>

            <div className="field">
                <label>cover:</label>
                <p>{this.state.cover}</p>
            </div>
      
            {cover_img}
            
            <div className="field">
              <button className="ui primary button">Delete</button>
            </div>
          
          </form>
        
      </div>
    )};
}

//react propTypes
GamesDelete.propTypes = {
  gamesReducer: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({

    gamesReducer: state.gamesReducer
  
});

export default connect(mapStateToProps,{fetchGameById,deleteGame})(GamesDelete);