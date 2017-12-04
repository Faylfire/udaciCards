import { AsyncStorage } from 'react-native'
import { genID, genIDSimple} from './helpers.js'
import { setDecks,
				 setDeckList,
				 DECKLIST_STORAGE_KEY,
				 DECK_STORAGE_KEY } from './api.js'



function getRandomNumber (max) {
  return Math.floor(Math.random() * max) + 0
}

export function setDummyData () {


  let decks = {}
  const timestamp = Date.now()
  let titles = ['React', 'Udacity', 'General', 'Japanese', 'Redux']

  for (let i = 0; i < 5; i++) {
    let id = genID()
    decks[id] = {
    	id:id,
    	title: titles[i%5],
    	description: 'Something new and interesting to learn... maybe.',
    	cards: genQuestions(getRandomNumber(12)),
    }
  }

  setDecks(decks)

  return decks
}


function genQuestions(num){

	let cards = {}

	if (num > 10){
		num = 10
	}

	for( let i=0; i< num; i++){
		let qid = genIDSimple()
		let qNum = getRandomNumber(255)
		cards[qid]={
			question:`What is the hex of ${qNum}?`,
			answer:qNum.toString(16),
			cardId: qid,
		}

	}

	return cards

}
