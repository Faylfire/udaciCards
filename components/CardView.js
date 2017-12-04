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
import ScreenHeader from './ScreenHeader.js'
import { width, height, totalSize } from 'react-native-dimension'



function Card ({ cardId, question, answer}) {
	return (
		<View key={cardId} style={styles.card}>
				<Text style={{flexWrap: 'wrap', fontSize:totalSize(5)}}>{question}</Text>
				{/*<Text style={{flexWrap:'wrap'}}>{`Description: ${description}`}</Text>*/}
				{/*<Text style={{flexWrap:'wrap'}}>{cards}</Text>*/}
		</View>

		)

}

function AddCardButton (){

	return(
		<TouchableOpacity style={{marginRight:5}}onPress={() => console.log("pressed")}>
			<Ionicons name='ios-add' size={40} color='#fff' />
    </TouchableOpacity>
   )
}


class CardView extends React.Component {

	 static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
      headerTintColor: white,
      headerRight: <AddCardButton />,
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
							<Text style={{flexWrap: 'wrap', fontSize:totalSize(10)}}>{answer}</Text>
						</View>
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
			//deck = decks[this.props.screenProps.deckId]
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
				<View style={{alignItems:'center'}}>

					{numCards === 0
						? <Text style={{marginTop:50}}>{message}</Text>
						: <FlatList
								data={cards}
								renderItem={this.renderItem}
								keyExtractor={(item, index) => index}
							/>
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
})



//function mapStateToProps (state, { navigation }) {}
function mapStateToProps (state, { navigation }) {
	let { allDecks } = state
	let { deckId } = navigation.state.params

  return {
    decks: allDecks,
    deckId: deckId,
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