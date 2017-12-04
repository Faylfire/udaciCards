import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'
import { combineReducers } from 'redux'


function allDecks (state = {}, action) {


  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
      return{
        ...state,
        [action.deckId]:{
          ...state[action.deckId],
          cards:{
            ...state[action.deckId].cards,
            ...action.card
          }
        }
      }
    default :
      return state
  }
}

export default combineReducers({
  allDecks
});