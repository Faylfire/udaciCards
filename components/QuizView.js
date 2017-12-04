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
//import FlexDemo from './FlexDemo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { purple, white } from '../utils/colors'
import { setDummyData} from '../utils/deckCreator.js'
import { getDecks } from '../utils/api.js'
import { isEmptyObj } from '../utils/helpers.js'
import { connect } from 'react-redux'
import { receiveDecks, addDeck, addCard } from '../actions'
import { width, height, totalSize } from 'react-native-dimension'
import AddCardButton from './AddCardButton.js'


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
					}
  }

	componentDidMount() {
		let { addAllDecks, decks, deckId } = this.props

	}



	renderItem = ({ item }) =>{
		let {question, answer, cardId } = item
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
					  />
					: <View key={cardId} style={[styles.card, {backgroundColor:'#AAB6A2'}]}>
							<Text adjustsFontSizeToFit style={{flexWrap: 'wrap'}}>{answer}</Text>
						</View>
				}
      </TouchableOpacity>
		)
	}

	render() {
		let { decks, deckId, numCards} = this.props
		let { quizQuestion } = this.state
		console.log("In Render CardView")
		console.log(decks)
		console.log(this.props)
		//let decks = Object.values(this.state.decks)
		let cards = {}
		let deck = {}
		let card = {}
		//let num = 0


		if (!isEmptyObj(decks)){
			//deck = decks[this.props.screenProps.deckId]
			deck=decks[deckId]
			cards = Object.values(deck.cards)
			//numCards = cards.length
			title = deck.title
			card = cards[0]
		}

		//let decks = setDummyData()
		//decks = Object.values(decks)
		console.log("Inside Card Render")
		console.log(cards)


		return (
			<View style={styles.container}>
				<Text style={{fontSize:20}}>
					{`${quizQuestion}/${numCards}`}
				</Text>
				{renderItem(card)}

				<View style={{flexDirection:'row', justifyContent:'space-around'}}>
					<TouchableOpacity
		         style={styles.buttonRight}
		         onPress={this.onPress}
		      >
		         <Text>Correct</Text>
		      </TouchableOpacity>
		      <TouchableOpacity
		         style={styles.buttonWrong}
		         onPress={this.onPress}
		      >
		         <Text>Incorrect</Text>
		      </TouchableOpacity>

				</View>
			</View>
		)
	}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ecf0f1',
  },
  review: {
  	flex:1,
    backgroundColor: 'steelblue',
    margin: 10,
    alignItems:'center',
    padding:10,
  },
  box: {
    width: 50,
    height: 70,
    backgroundColor: '#e76e63',
    margin: 10,
    alignItems:'center'
  },
  card: {
    backgroundColor: '#91C3DC',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    width: width(70),
    height: height(60),
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
  buttonRight: {
    alignItems: 'center',
    backgroundColor: '#009933',
    padding: 10
  },
  buttonWrong: {
    alignItems: 'center',
    backgroundColor: '#cc0000',
    padding: 10
  },
})



//function mapStateToProps (state, { navigation }) {}
function mapStateToProps (state, { navigation }) {
	let { allDecks } = state
	let { deckId } = navigation.state.params

	let deck = allDecks[deckId]
	let cards = Object.values(deck.cards)
	let numCards = cards.length

  return {
    decks: allDecks,
    deckId: deckId,
    numCards: numCards,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    newDeck: (data) => dispatch(addDeck(data)),
    newCard: (data) => dispatch(addCard(data)),
		addAllDecks: (data) => dispatch(receiveDecks(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(QuizView)