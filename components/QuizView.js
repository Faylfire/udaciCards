import React, { Component } from 'react'
import { StyleSheet,
				 Text,
				 View,
				 ScrollView,
				 FlatList,
				 TouchableOpacity,
				 Platform,
				 Button,
} from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { TabNavigator, StackNavigator} from 'react-navigation'
import { Constants } from 'expo'
import { purple, white, steelblue } from '../utils/colors'
import { getDecks } from '../utils/api.js'
import { isEmptyObj,
				 clearLocalNotification,
  			 setLocalNotification,
} from '../utils/helpers.js'
import { connect } from 'react-redux'
import { receiveDecks, addDeck, addCard } from '../actions'
import { width, height, totalSize } from 'react-native-dimension'
import AddCardButton from './AddCardButton.js'


function Card ({ cardId, question, answer, message, backgroundColor}) {
	return (
			<View key={cardId} style={[styles.card, {backgroundColor:backgroundColor}]}>
					<Text allowFontScaling
								style={{flexWrap: 'wrap', color:'#555555'}}
					>
						{message}
					</Text>
			</View>
		)
}


class QuizView extends React.Component {

	 static navigationOptions = ({ navigation }) => ({
    title: `Quiz`,
      headerTintColor: white,
      headerTitleAllowFontScaling: false,
      headerStyle: {
        backgroundColor: '#4682B4',
      },
      headerTitleStyle: {
      	fontSize:14
      }
    });

	constructor(props) {
    super(props);
    this.state = {
    				deck:{},
    				cardBack:{},
    				quizQuestion:1,
    				score:0,
    				quizComplete:false,
					}
  }

	componentDidMount() {
		let { addAllDecks, decks, deckId } = this.props

	}

	renderItem = ({ card }) =>{
		let {question, answer, cardId } = card
		let { cardBack } = this.state
		let state = this.state

		return (
			<TouchableOpacity key={cardId} style={{flex:1}}
            onPress={() => this.setState({...state,
            																cardBack:{
            																	...cardBack,
            																	[cardId]: cardBack[cardId]===undefined ? true : !cardBack[cardId]
            																}})}
      >
      	{!state.cardBack[cardId]
	        ? <Card
							cardId={cardId}
							question={question}
							answer={answer}
							message={question}
							backgroundColor='#91C3DC'
					  />
					: <Card
							cardId={cardId}
							question={question}
							answer={answer}
							message={answer}
							backgroundColor='#AAB6A2'
					  />
				}
      </TouchableOpacity>
		)

	}

	//Resets the internal state so the quiz starts over
	resetQuiz = () => {
		this.setState({
    				deck:{},
    				cardBack:{},
    				quizQuestion:1,
    				score:0,
    				quizComplete:false,
					})
	}

	//Returns to indivdual deck view using navigation's goBack()
	backToDeck = () => this.props.navigation.goBack()

	//Calls onPress for correct or incorrect Self Assessment
	onCorrect = () => this.onPress(true)

	onIncorrect = () => this.onPress(false)

	//Handles the scoring and moving the quiz along upon self
	//judgement
	onPress = (bool) => {

		let quizQuestion = this.state.quizQuestion + 1
		let score = this.state.score
		let {numCards} = this.props

		if (bool){
			score = score+1
		}

		if (quizQuestion > numCards){
			this.setState({
				score:score,
				quizComplete: true,
			})

			clearLocalNotification()
				.then(setLocalNotification)

		} else {
			this.setState({
				quizQuestion: quizQuestion,
				score:score,
			})
		}
	}

	render() {
		let { decks, deckId, numCards, cards} = this.props
		let { quizQuestion, quizComplete, score} = this.state

		let card = {}
		let finalScore = 0


		//If we have the decks, then getting the card from the decks
		//would be successful.
		if (!isEmptyObj(decks)){
			card = cards[quizQuestion-1]
			finalScore = (score/numCards*100).toFixed(0)
		}

		//Quiz View, when quiz is complete, show score otherwise, the cards in the deck
		//and self scoring options with correct/incorrect buttons
		return (
			<View style={{flex:1}}>
				{quizComplete===true
					?	<View style={styles.container}>
							<Text style={{color:'#555', fontSize:32,textAlign:'center'}}>
								{`Score: ${finalScore}%\n${score}/${numCards} Correct`}
							</Text>
							<View style={{flexDirection:'row', justifyContent:'space-around'}}>
								<TouchableOpacity
					         style={[styles.button, styles.btnNeutral]}
					         onPress={this.backToDeck}
					      >
					         <Text style={{color:'#fff', textAlign:'center'}}>Back to Deck!</Text>
					      </TouchableOpacity>
					      <TouchableOpacity
					         style={[styles.button, styles.btnNeutral]}
					         onPress={this.resetQuiz}
					      >
					         <Text style={{color:'#fff', textAlign:'center'}}>Restart Quiz!</Text>
					      </TouchableOpacity>
							</View>
						</View>
					: <View style={styles.container}>
							<Text style={{margin:5, fontSize:20}}>
									{`${quizQuestion}/${numCards}`}
								</Text>
								<ScrollView style={{flex:1}}>
									{this.renderItem({card:card})}
								</ScrollView>
								<View style={{flexDirection:'row', justifyContent:'space-around'}}>
									<TouchableOpacity
						         style={[styles.button, styles.btnCorrect]}
						         onPress={this.onCorrect}
						      >
						         <Text style={{color:'#555'}}>Know it!</Text>
						      </TouchableOpacity>
						      <TouchableOpacity
						         style={[styles.button, styles.btnWrong]}
						         onPress={this.onIncorrect}
						      >
						         <Text style={{color:'#555'}}>Not Yet!</Text>
						      </TouchableOpacity>
								</View>
							</View>
					}
				</View>
		)
	}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ecf0f1',
    alignItems:'center',
    justifyContent:'space-around'
  },
  card: {
    backgroundColor: '#91C3DC',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    height: height(60),
    width: width(75),
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    alignItems:'center',
    justifyContent:'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  addCardMessage:{
  	marginTop:50,
  	textAlign:'center',
  	marginRight:10,
  	marginLeft:10,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius:15,
    margin:20,
    width:100,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  btnCorrect:{
  	backgroundColor: '#4dac26',
  },
  btnWrong: {
    backgroundColor: '#d01c8b',
  },
  btnNeutral:{
  	backgroundColor: '#00477F',
  },
})



function mapStateToProps (state, { navigation }) {
	let { allDecks } = state
	let { deckId } = navigation.state.params

	//Caculate number of cards in the deck so it can be used as a prop
	let deck = allDecks[deckId]
	let cards = Object.values(deck.cards)
	let numCards = cards.length


  return {
    decks: allDecks,
    deckId: deckId,
    numCards: numCards,
    cards:cards,
  }
}


export default connect(
  mapStateToProps
  )(QuizView)