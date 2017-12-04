import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import { Notifications, Permissions } from 'expo'


const NOTIFICATION_KEY = 'UdaciCards:notifications'



function isEmptyObj (obj) {
  if (obj === null || obj === undefined){
    return true
  }
  return (Object.keys(obj).length === 0 && obj.constructor === Object)
}


function genID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal. With the addition of the Date this should mean that unless
  // more than 10 thousand ids are generated every milisecond, there should be no collisions

  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

function genIDSimple() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal. With the addition of the Date this should mean that unless
  // more than 10 thousand ids are generated every milisecond, there should be no collisions

  return Math.random().toString(36).substr(2, 9);
};


function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}


function getHeaderTitle (deck, newCard){
	let cards = deck.cards
  let cardCount = Object.keys(cards).length
	let title = deck.title

	if (newCard){
		cardCount = cardCount + 1
	}

	if (cardCount !== 1){
		title=`${title} (${cardCount} Cards)`
	} else {
		title=`${title} (${cardCount} Card)`
	}

	return title
}




function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Take a Quiz!',
    body: "👋 Don't forget to practice with a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate()+1)
              tomorrow.setHours(12)
              tomorrow.setMinutes(30)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}



module.exports = {
  genID,
  capitalize,
  genIDSimple,
  isEmptyObj,
  getHeaderTitle,
  clearLocalNotification,
  setLocalNotification,

}