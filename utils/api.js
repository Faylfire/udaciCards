//api.js




import { AsyncStorage } from 'react-native'
import { genID, genIDSimple} from '../utils/helpers.js'



//export const DECKLIST_STORAGE_KEY = 'UdaciCards:DeckList'
export const DECK_STORAGE_KEY = 'UdaciCards:Deck'

//Get all decks in storage
export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => JSON.parse(results))
}

//get a single deck using the id provided
export function getDeck(Id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => JSON.parse(results))
    .then((data) => data[Id] === undefined ? {} : data[Id])
}

//update AsyncStorage with a set of decks (for initialization)
export function setDecks(decks) {
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
}

//Update the appropriate deck with the correct key
//key is Id of Deck, entry should be
// { cards:{
//      questionID: {question:"string",
//                   answer: "string",
//                   id: questionID,
//                   }
//       }
// }
export function updateDeck ({ entry, key }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}


//remove a particular deck from the list
export function removeDeck (key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

export function removeAllDecks () {
  return AsyncStorage.removItem(DECK_STORAGE_KEY)
}

/*
export function removeFromDeckList (key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}*/


/*
//key is Id of Deck, entry should be
export function updateDeckList ({ entry, key }) {
  return AsyncStorage.mergeItem(DECKLIST_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}*/


/*export function getDeckList () {
  return AsyncStorage.getItem(DECKLIST_STORAGE_KEY)
    .then((results) => JSON.parse(results))
}*/

/*
export function getDeckInfo(Id) {
  return AsyncStorage.getItem(DECKLIST_STORAGE_KEY)
    .then((results) => JSON.parse(results))
    .then((data) => data[Id] === undefined ? {} : data[Id])
}*/

/*
export function setDeckList(deckList) {
  return AsyncStorage.setItem(DECKLIST_STORAGE_KEY, JSON.stringify(deckList))
}*/