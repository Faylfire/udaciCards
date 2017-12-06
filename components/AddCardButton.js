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
import { FontAwesome, Ionicons, Foundation, Entypo, Feather } from '@expo/vector-icons'
import styled from 'styled-components/native'
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { purple, white } from '../utils/colors'
import { setDummyData} from '../utils/deckCreator.js'
import { getDecks } from '../utils/api.js'
import { isEmptyObj } from '../utils/helpers.js'
import { connect } from 'react-redux'
import { receiveDecks, addDeck, addCard } from '../actions'



export default class AddCardButton extends React.Component {


	render () {
		let {deckId} = this.props.nav.state.params
		let {nav} = this.props
		//console.log(this.props)
		return (
			<TouchableOpacity style={{marginRight:5}}
						onPress={() => nav.navigate(
              'CreateCard',
              { deckId: deckId}
            )}>

				<Feather name='plus' size={40} color='#fff' />

		  </TouchableOpacity>
    )
	}

}

