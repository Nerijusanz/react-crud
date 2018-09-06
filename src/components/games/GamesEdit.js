import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchGameById,editGame} from '../../actions/gamesActions';


import classnames from 'classnames';

class GamesEdit extends Component {

  state={
    id:null,  //fld id
    title:'', //fld input title value
    cover:'',   //fld input cover value
    errors:{},//errors.server  errors.validation
    loading:false
  };

  componentDidMount(){
    
    if(this.props.match.params.id !== undefined)
      this.props.fetchGameById(this.props.match.params.id);
  
  }


  componentWillReceiveProps(newProps){

    let gameObj = newProps.gamesReducer;
    
    let loading = (this.state.loading !== gameObj.loading)?gameObj.loading:this.state.loading;
    

    let id = (gameObj.game._id !== undefined)?gameObj.game._id: this.state.id;
    let title = (gameObj.game.title !== undefined)?gameObj.game.title: this.state.title;
    let cover = (gameObj.game.cover !== undefined)?gameObj.game.cover: this.state.cover;

    let errors={};

    if(gameObj.errors.validation !== undefined)
      errors.validation = gameObj.errors.validation;

    if(gameObj.errors.server !== undefined)
      errors.server = gameObj.errors.server;
       
  
    this.setState({
      id:id,
      title:title,
      cover:cover,
      loading:loading,
      errors:errors
    });

  }


  handleChange = (e) =>{
    
    if(this.state.errors.validation !== undefined){

      let errors = Object.assign({},this.state.errors);

      if(errors.validation[e.target.name] !== undefined)
        delete errors.validation[e.target.name];

      this.setState({
        [e.target.name]:e.target.value,
        errors
      });

      return;

    }

    this.setState({[e.target.name]:e.target.value});

  }


  make_form_validation = () =>{

      //fronted validation errors
      let errors={
        validation:{}
      };
  
      if(this.state.title ==='') errors.validation.title='field title is empty';
      if(this.state.cover ==='') errors.validation.cover='field cover url is empty';
  
      const isValid = Object.keys(errors.validation).length === 0; //return true or false

      let validation_errors = (!isValid)?errors:'';

      return {isValid,validation_errors};

  }


  handleSubmit = (e)=>{
    e.preventDefault();

    const {isValid,validation_errors} = this.make_form_validation();
    
    if(!isValid){
      this.setState({errors:validation_errors});
      return;
    }

    //validation OK;

    const game = {
      title:this.state.title,
      cover:this.state.cover
    }

    if(this.props.match.params.id){

      let id = this.props.match.params.id;

      this.props.editGame(game,id);
    }

  }


  render(){

    const server_errors = (this.state.errors.server)? <div className="ui negative message"><p>{this.state.errors.server}</p></div> : '';
    
    let fld_title_error, //for field add class error or not;
        fld_cover_error;

    if(this.state.errors.validation !== undefined){

      fld_title_error = (this.state.errors.validation.title)?true:false;
      fld_cover_error = (this.state.errors.validation.cover)?true:false;
    }

    const img = <div className="field"><img src="https://via.placeholder.com/150x150" alt="cover" className="ui small bordered image"/></div>;
    const cover_img =(this.state.cover !=='')?img:null;
      
    return (
      <div>

        <h1>Game Edit</h1>
        {server_errors}
          
            
          <form className={classnames('ui','form',{loading:this.state.loading})} onSubmit={this.handleSubmit}>
            
            <div className={classnames('field',{error:!!fld_title_error })}>
              <label htmlFor="title">Title</label>
              {(fld_title_error)? <span>{this.state.errors.validation.title}</span>:''}
              <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} placeholder="title" />
            </div>
            

            <div className={classnames('field',{error:!!fld_cover_error})}>
              <label htmlFor="cover">Cover</label>
              {(fld_cover_error) && <span>{this.state.errors.validation.cover}</span>}
              <input type="text" id="cover" name="cover" value={this.state.cover} onChange={this.handleChange} placeholder="cover url" />
            </div>
            
      
            {cover_img}
            

            <div className="field">
              <button className="ui primary button">Save</button>
            </div>
          
          </form>
        
      </div>
    )};
}

//react propTypes
GamesEdit.propTypes = {
  gamesReducer: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({

    gamesReducer: state.gamesReducer
  
});

export default connect(mapStateToProps,{fetchGameById,editGame})(GamesEdit);