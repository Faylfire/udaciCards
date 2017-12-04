import React, { Component } from 'react'
import { StyleSheet,
				 Text,
				 View,
				 ScrollView,
				 FlatList,
				 TouchableOpacity,
				 Platform
} from 'react-native'
//import FlexDemo from './FlexDemo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { purple, white } from '../utils/colors'
import { setDummyData} from '../utils/deckCreator.js'
import { getDecks } from '../utils/api.js'
import { isEmptyObj, getHeaderTitle } from '../utils/helpers.js'
import { connect } from 'react-redux'
import { receiveDecks, addDeck, addCard } from '../actions'
import ScreenHeader from './ScreenHeader.js'



function Deck ({ deckId, title, cardCount, description, cards}) {

	return (
		<View key={deckId} style={styles.card}>
				<Text style={{fontSize:20}}>{title}</Text>
				<Text style={{margin:5}}>
					{cardCount!==1 ? `${cardCount} Cards` : `${cardCount} Card`}
				</Text>
				{/*<Text style={{margin:5}}>{deckId}</Text>*/}
				{/*<Text style={{flexWrap:'wrap'}}>{`Description: ${description}`}</Text>*/}
				{/*<Text style={{flexWrap:'wrap'}}>{cards}</Text>*/}
		</View>

		)

}

class DeckView extends React.Component {

	static navigationOptions = ({ navigation }) => ({
    title: 'My Flashcards',
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
    				decks:{},
    				pressed:false,
    				cardBack:{}
					}
  }

	componentDidMount() {
		let { addAllDecks } = this.props
		console.log("Inside ComponentMount")
		console.log(this.props.decks)

		getDecks().then((data) => {
			if (!isEmptyObj(data)) {
				this.setState({
					decks: data
				})

				addAllDecks(data)

			} else {
				let decks  = setDummyData()
				this.setState({
					decks: decks
				})

				addAllDecks(decks)
			}
		})

	}




	renderItem = ({ item }) =>{
		let {title, cards, description, id } = item
		let { pressed, cardBack } = this.state
		let state = this.state
		let cardCount = Object.keys(cards).length
		let individualTitle = getHeaderTitle(item)

		return (
			<TouchableOpacity style={{flex:1}}
            onPress={() => this.props.navigation.navigate(
              'IndividualDeck',
              { deckId: id, title: individualTitle }
            )}
      >
      	{!state.cardBack[id]
	        ? <Deck
							deckId={id}
							title={title}
							description={description}
							cardCount={cardCount}
							cards={JSON.stringify(cards)}
					  />
					: <View key={id} style={styles.card}>
							<Text style={{fontSize:20}}></Text>
							<Text style={{margin:11}}>Back of the Card </Text>
							<Text ></Text>
						</View>

				}
      </TouchableOpacity>
		)

	}

	render() {

		//let decks = Object.values(this.state.decks)
		let decks = Object.values(this.props.decks)
		//let decks = setDummyData()
		//decks = Object.values(decks)
		console.log("Inside Render")
		console.log(decks)


		if (decks.length !== 0){
			decks[0].description = 'Something new and interesting to learn... maybe. But Just a little bit longer. Something new and interesting to learn... maybe. But Just a little bit longer. Something new and interesting to learn... maybe. But Just a little bit longer.'

		}

		return (
			<View style={styles.container}>
				<FlatList
					data={decks}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => index}
				/>
			</View>
		)
	}
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ecf0f1',
    alignItems:'stretch'
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
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    alignItems:'center',
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

  return {
    decks: allDecks,
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
  )(DeckView)




