
import React, { Component } from 'react'
import { StyleSheet, Text, View, AppRegistry, Platform, StatusBar } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { purple, white } from './utils/colors'
import DeckView from './components/DeckView.js'
import CardView from './components/CardView.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import AddDeck from './components/AddDeck.js'
import AddCard from './components/AddCard.js'
import ScreenHeader from './components/ScreenHeader.js'

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
    <AddDeck />
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

//const Tabs = TabNavigator(RouteConfigs, TabNavigatorConfig)


const Tabs = TabNavigator({
  Collection: {
    screen: DeckView,
    title: 'My Flashcards',
    navigationOptions: {
      tabBarLabel: 'Collection',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list-box' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    //screen: CardView,
    screen: AddDeck,
    title: 'Add New Deck',
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'steelblue' : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : 'steelblue',
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

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTintStyle:"#fff"
    }
  },
  IndividualDeck: {
    screen: CardView,
    navigationOptions: {
      headerTintStyle:"#fff"
    }
  },
  CreateCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintStyle:"#fff"
    }
  },
})





export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(rootReducer)}>
        <View style={{flex:1}}>
          <MainNavigator />
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
