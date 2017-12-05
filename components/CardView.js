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
import { TabNavigator, StackNavigator } from 'react-navigation'
import { purple, white } from '../utils/colors'
import { getDecks } from '../utils/api.js'
import { isEmptyObj } from '../utils/helpers.js'
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


class CardView extends React.Component {

	 static navigationOptions = ({ navigation }) => ({
    	title: navigation.state.params.myTitle ? navigation.state.params.myTitle : 'Card View',
      headerTintColor: white,
      headerRight: <AddCardButton nav={navigation} />,
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
    				cardBack:{}
					}
  }

	componentDidMount() {
		let { addAllDecks } = this.props
		this.props.navigation.setParams({
 			myTitle: this.props.headerTitle
		})
	}

	componentWillReceiveProps(nextProps){

		//Tests when a view navigates back using goBack()
		//If there is a change in the Title of the screen
		//Updates the Title accordingly
		if (nextProps.headerTitle !== this.props.headerTitle){
			console.log("Inside if")
      this.props.navigation.setParams({
 				myTitle: nextProps.headerTitle
			})

    }

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

	render() {
		let { decks, deckId } = this.props
		console.log("In Render CardView")
		console.log(decks)
		console.log(this.props)
		//let decks = Object.values(this.state.decks)
		let cards = {}
		let deck = {}
		let numCards = 0
		let title='UdaciCards'
		let message = "👋 Add a new card using the + Button on the top right!"

		if (!isEmptyObj(decks)){
			deck=decks[deckId]
			cards = Object.values(deck.cards)
			numCards = cards.length
			title = deck.title
		}

		//let decks = setDummyData()
		//decks = Object.values(decks)
		console.log("Inside Card Render")
		console.log(cards)


		if (numCards !== 0){
			title=`${title} (${numCards} Cards)`
		}



		return (
			<View style={styles.container}>


				<View style={{alignItems:'center', backgroundColor:'#ecf0f1'}}>

					{numCards === 0
						? <Text style={styles.addCardMessage}>{message}</Text>
						:
							<View style={{alignItems:'center'}}>
								<TouchableOpacity
				         	style={styles.button}
				         	onPress={() => this.props.navigation.navigate(
              							'QuizView',
              							{ deckId: deckId }
            							)}
				        >
				         	<Text style={{color:'#D9DB56'}}> Start Quiz! </Text>
				       	</TouchableOpacity>
								<FlatList
									data={cards}
									renderItem={this.renderItem}
									keyExtractor={(item, index) => index}
								/>
							</View>
					}

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
  card: {
    backgroundColor: '#91C3DC',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    width: width(70),
    height: height(50),
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
  cardA: {
    backgroundColor: '#fffcf0',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    height:200,
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
    backgroundColor: '#00477F',
    padding: 10,
    width: 120,
    borderRadius:10,
    margin:10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  }
})



//function mapStateToProps (state, { navigation }) {}
function mapStateToProps (state, { navigation }) {
	let { allDecks, headerTitle } = state
	let { deckId } = navigation.state.params

  return {
    decks: allDecks,
    deckId: deckId,
    headerTitle: headerTitle,
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
  )(CardView)