//api.js




import { AsyncStorage } from 'react-native'
import { genID, genIDSimple} from '../utils/helpers.js'



export const DECKLIST_STORAGE_KEY = 'UdaciCards:DeckList'
export const DECK_STORAGE_KEY = 'UdaciCards:Deck'

export function getDeckList () {
  return AsyncStorage.getItem(DECKLIST_STORAGE_KEY)
    .then((results) => JSON.parse(results))
}

export function getDeckInfo(Id) {
  return AsyncStorage.getItem(DECKLIST_STORAGE_KEY)
    .then((results) => JSON.parse(results))
    .then((data) => data[Id] === undefined ? {} : data[Id])
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => JSON.parse(results))
}

export function getDeck(Id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => JSON.parse(results))
    .then((data) => data[Id] === undefined ? {} : data[Id])
}

export function setDecks(decks) {
  return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
}

export function setDeckList(deckList) {
  return AsyncStorage.setItem(DECKLIST_STORAGE_KEY, JSON.stringify(deckList))
}




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

//key is Id of Deck, entry should be
export function updateDeckList ({ entry, key }) {
  return AsyncStorage.mergeItem(DECKLIST_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeDeck (key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

export function removeFromDeckList (key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}