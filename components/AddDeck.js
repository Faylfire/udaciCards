import React, { Component } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Button, Keyboard } from 'react-native';
//import { Constants } from 'expo';
import {
  FormLabel,
  FormInput,
} from 'react-native-elements';
import { Constants } from 'expo';
import { genID, genIDSimple} from '../utils/helpers.js'
import { updateDeck } from '../utils/api.js'
import { connect } from 'react-redux'
import { receiveDecks, addDeck, addCard } from '../actions'



class AddDeck extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Create New Deck',
      headerTintColor: '#fff',
      headerTitleAllowFontScaling: false,
      headerStyle: {
        backgroundColor: '#4682B4',
      },
      headerTitleStyle: {
        fontSize:14
      }
    });


  state = { title: '' }

  changeText = text => this.setState({ title: text });


  handleSubmit = () => {
    const { newDeck } = this.props
    let deck = {}
    let id = genID()
    let title = this.state.title.trim()

    if (title === ''){
      title='Untitled Deck'
    }

    deck[id] = {
      id:id,
      title: title,
      description: `Something new and interesting to learn... ${this.state.title}.`,
      cards: {},
    }

    //Dispatch redux
    newDeck(deck)

    //Update DB
    updateDeck({ entry:deck[id], key:id })

    //Set title to ''
    this.setState({title: ''})

    //Dismiss Keyboard
    Keyboard.dismiss()

    //navigate to individual deck view
    this.props.navigation.navigate(
              'IndividualDeck',
              { deckId: id, title: title }
            )
  }

  render() {

    return (
      <View style={{flex:1}}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={{alignItems:'center', margin:10}}>
            <FormLabel labelStyle={{fontSize:24, textAlign:'center'}}>Name your new deck!</FormLabel>
            <FormInput containerStyle={{margin:10}}
                       inputStyle={{fontSize:24, textAlign:'center'}}
                       placeholder='New Deck'
                       value={this.state.title}
                       onChangeText={this.changeText}
            />
          </View>
          <Button
            onPress={this.handleSubmit}
            title="Create Deck"
            color="steelblue"
            accessibilityLabel="Learn more about this purple button"
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});


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
  )(AddDeck)
