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
import { receiveDecks, addDeck, addCard, changeHeaderTitle } from '../actions'




class AddCard extends Component {


  static navigationOptions = ({ navigation }) => ({
      title: 'Add New Card',
      headerTintColor: '#fff',
      headerTitleAllowFontScaling: false,
      headerStyle: {
        backgroundColor: '#4682B4',
      },
      headerTitleStyle: {
        fontSize:14
      }
    });

  state = {question: '', answer:''}

  changeQuestion = text => this.setState({ question: text });

  changeAnswer = text => this.setState({ answer: text });


  handleSubmit = () => {
    const { newCard, newDeck, decks, deckId, changeTitle } = this.props
    let deck = decks[deckId]
    let title = getHeaderTitle(deck, true)
    let question= this.state.question.trim()
    let answer= this.state.answer.trim()
    let id = genIDSimple()
    if (question === ''){
      question="What is the answer to the Ultimate Question of Life, the Universe, and Everything?"
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

    //Set the name for the individual deck View
    //increasing card count by one
    console.log("Title change: " + title)
    changeTitle(title)

    //navigate back to individual deck View
    /*this.props.navigation.navigate(
              'IndividualDeck',
              { deckId: deckId, title: title }
            )*/
    this.props.navigation.goBack()

  }

  render() {
    console.log(this.props)

    return (
      <View style={{flex:1}}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={{alignItems:'center', margin:10}}>
            <FormLabel labelStyle={{fontSize:24, textAlign:'center'}}>Question:</FormLabel>
            <FormInput containerStyle={{margin:10}}
                       inputStyle={{fontSize:14, textAlign:'center'}}
                       placeholder='Your Question'
                       name='question'
                       value={this.state.question}
                       onChangeText={this.changeQuestion}
            />
            <FormLabel labelStyle={{fontSize:24, textAlign:'center'}}>Answer:</FormLabel>
            <FormInput containerStyle={{margin:10}}
                       inputStyle={{fontSize:14, textAlign:'center'}}
                       placeholder='Your Answer'
                       name='answer'
                       value={this.state.answer}
                       onChangeText={this.changeAnswer}
            />
          </View>
          <Button
            onPress={this.handleSubmit}
            title="Add Card"
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
    changeTitle: (title) => dispatch(changeHeaderTitle(title)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(AddCard)