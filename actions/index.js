export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const CHANGE_HEADER_TITLE = 'CHANGE_HEADER_TITLE'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks:decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck: deck,
  }
}

//Add single card to the correct deck
export function addCard ({deckId, card}) {
  return {
    type: ADD_CARD,
    deckId,
    card
  }
}

export function changeHeaderTitle (title) {
  return {
    type: CHANGE_HEADER_TITLE,
		title:title,
  }
}



