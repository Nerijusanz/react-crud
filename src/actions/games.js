export default function fetchGames(){
    return dispatch =>{
        fetch('api/games');
    }
}