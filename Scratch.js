//Scratch.js


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


//ScrollView
export default class DeckView extends React.Component {



	render() {
		let decks = setDummyData()
		decks = Object.values(decks)

		return (
			<ScrollView style={styles.container}>
				{decks.map((deck) => {
					let {title, cards, description } = deck
					let cardCount = Object.keys(cards).length

					return (
						<Deck key={title}
									title={title}
									description={description}
									cardCount={cardCount}
						/>
					)
				})}
			</ScrollView>
		)
	}
}



//App.js

import React, { Component } from 'react'
import { StyleSheet, Text, View, AppRegistry, Platform, StatusBar } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { purple, white } from './utils/colors'
import DeckView from './components/DeckView.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'


const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #333;
`

function Home () {
  return (
    <DeckView />

  )
}

function Dashboard () {
  return (
      <View style={styles.container}>
        {Platform.OS == 'ios'
          ? <Ionicons name='ios-aperture' size={100} color='purple' />
          : <Ionicons name='md-aperture' size={100} color='red' />
        }

      </View>
  )
}

function UdaciStatusBar ( { backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}



//TabNavigator(RouteConfigs, TabNavigatorConfig)
const RouteConfigs = {
  Home: {
    screen: Home,
  },
  Dashboard: {
    screen: Dashboard
  },
}

const TabNavigatorConfig = {swipeEnabled: true}

const Tabs = TabNavigator(RouteConfigs, TabNavigatorConfig)


const TabsA = TabNavigator({
  History: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddEntry: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  swipeEnabled: true,
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})





export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(rootReducer)}>
        <View style={{flex:1}}>
          <UdaciStatusBar backgroundColor={'steelblue'} barStyle='light-content' />
          <TabsA />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: '#e76e63',
    margin: 10,
  }
})


//from Deck View

				<TouchableOpacity style={styles.box}
          onPress={() => this.setState({pressed:!this.state.pressed})
          }
        >
        <View>
          {Platform.OS == 'ios'
            ? <Ionicons name='ios-hand' size={50} color='purple' />
            : <Ionicons name='md-hand' size={50} color='red' />
          }
          <Text>{this.state.pressed.toString()}</Text>
          </View>
        </TouchableOpacity>