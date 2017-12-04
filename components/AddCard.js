import React, { Component } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Button, Keyboard } from 'react-native';
//import { Constants } from 'expo';
import {
  FormLabel,
  FormInput,
} from 'react-native-elements';
import { Constants } from 'expo';
import { genID, genIDSimple, getHeaderTitle } from '../utils/helpers.js'
import { updateDeck } from '../utils/api.js'
import { connect } from 'react-redux'
import { receiveDecks, addDeck, addCard } from '../actions'
import ScreenHeader from './ScreenHeader.js'



class AddCard extends Component {
  state = {question: '', answer:''}

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { newCard, allDecks, deckId } = this.props
    let deck = allDecks[deckId]
    let title = getHeaderTitle(deck)
    let question= this.state.question.trim()
    let answer= this.state.answer.trim()
    let id = genIDSimple()
    if (question === ''){
      question="What is the answer to the Ultimate Question of Life, the Universe, and Everything."
    }

    if (answer === ''){
      answer='42'
    }

    deck.cards = {
      ...deck.cards,
      [id]:{
        cardId:id,
        question: question,
        answer:answer
      }
    }

    //Dispatch redux
    newDeck({[deckId]:deck})

    //Update DB
    updateDeck({ entry:deck, key:deckId})

    //Set title to ''
    this.setState({question: '', answer:''})

    //Dismiss Keyboard
    Keyboard.dismiss()

    //navigate back to individual card list
    this.props.navigation.navigate(
              'IndividualDeck',
              { deckId: deckId, title: title }
            )
    //this.props.navigation.navigate('Collection')
  }

  render() {

    return (
      <View style={{flex:1}}>
        <ScreenHeader title='Add New Card' />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={{alignItems:'center', margin:10}}>
            <FormLabel labelStyle={{fontSize:24, textAlign:'center'}}>Question:</FormLabel>
            <FormInput containerStyle={{margin:10}}
                       inputStyle={{fontSize:24, textAlign:'center'}}
                       placeholder='New Question'
                       name='question'
                       value={this.state.question}
                       onChange={this.handleChange}
            />
            <FormLabel labelStyle={{fontSize:24, textAlign:'center'}}>Answer:</FormLabel>
            <FormInput containerStyle={{margin:10}}
                       inputStyle={{fontSize:24, textAlign:'center'}}
                       placeholder='New Question'
                       name='answer'
                       value={this.state.answer}
                       onChange={this.handleChange}
            />
          </View>
          <Button
            onPress={this.handleSubmit}
            title="Add Card"
            color="#91C3DC"
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
  )(AddCard)