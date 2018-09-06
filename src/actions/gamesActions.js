import axios from 'axios';
import {
  GET_GAMES,
  GET_GAME,
  ADD_GAME,
  EDIT_GAME,
  DELETE_GAME,
  GAMES_LOADING,
  SET_ERROR
} from './types';


export const fetchGames = () => dispatch => {
  dispatch(setGamesLoading());

    axios.get('/api/games').then(res =>{

    dispatch({
      type:GET_GAMES,
      payload:res.data
    });

    }).catch(error=>{
        
      dispatch(setServerError(error));
    });
    
};


export const fetchGameById = (id) => dispatch =>{

    dispatch(setGamesLoading());

    axios.get(`/api/games/${id}`).then(res =>{

        dispatch({
            type:GET_GAME,
            payload:res.data
        });


    }).catch(error=>{
        
        dispatch(setServerError(error));

    });
    
};

export const editGame = (game, id) => dispatch => {

    dispatch(setGamesLoading());
    
    axios.put(`/api/games/edit/${id}`,game).then(res =>{

        //console.log(res.data);
        setTimeout(()=>{

            if(res.data.errors){    //backend validation errors
                dispatch(setValidationError(res.data.errors));
                return;
            }


            dispatch({
                type:EDIT_GAME,
                payload:res.data
            });


        },3000);

    }).catch(error=>{
 
        dispatch(setServerError(error));

    });

};

export const deleteGame = id => dispatch => {

  axios.delete(`/api/games/del/${id}`).then(res => {
    dispatch({
      type: DELETE_GAME,
      payload: res.data
    });

  }).catch(error=>{

    dispatch(setServerError(error));
  });
};

export const addGame = game => dispatch => {

  dispatch(setGamesLoading());
    
  axios.post('/api/games/add',game).then(res => {

    //console.log(res.data);
    setTimeout(()=>{

    if (res.data.errors) {    // backend validation errors
        dispatch(setValidationError(res.data.errors));
        return;
    }

    dispatch({
        type:ADD_GAME,
        payload:res.data
    });

    },3000);

  }).catch(error=>{
    dispatch(setServerError(error));
  });
};


export const setServerError = (error) => {

  const serverError = {};

  serverError.server = (error.response.data.errors.server) ? error.response.data.errors.server : error.response.statusText;

  return {
    type: SET_ERROR,
    payload: serverError,
  };
};

export const setValidationError = (error) => {

  return {
    type: SET_ERROR,
    payload: error,
  };
};

export const setGamesLoading = () => {

  return {
    type: GAMES_LOADING,
  };
};
