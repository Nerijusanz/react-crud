import {
    GET_GAMES,
    GET_GAME,
    ADD_GAME,
    EDIT_GAME,
    DELETE_GAME,
    GAMES_LOADING,
    SET_ERROR
} from '../actions/types';


const initialState = {
    games:[],
    game:{},
    loading:false,
    errors:{},
    done:false
};

export default function(state=initialState,action){

    switch(action.type){
        case GET_GAMES:
            return {
                ...state,
                games:action.payload,
                loading:false             
            }

        case GET_GAME:
            return {
                ...state,
                game:action.payload,
                loading:false,
                errors:{}
                
            }

        case ADD_GAME:
            return {
                ...state,
                games:[...state.games,action.payload],
                loading:false,
                errors:{},
                done:true
            }

        case EDIT_GAME:
            return {
                ...state,
                games:state.games.map(game=>{
                     return (game._id === action.payload._id)?action.payload : game;   //note:server return updated item object                   
                }),
                loading:false,
                errors:{}

            }

        case DELETE_GAME:
            return {
                ...state,
                games: state.games.filter(game=>game._id !== action.payload),   //note:server return deleted item id
                loading:false,
                errors:{},
                done:true
            }



        case GAMES_LOADING:
            return {
                ...state,
                loading:true,
                done:false
            }

        case SET_ERROR:
            return {
                ...state,
                errors:action.payload,
                loading:false
            }
            
        default: return state;
    }


}