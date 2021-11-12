import React, { Component } from 'react';
// import { StyleSheet, View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import Chat from './components/Chat';
import Start from './components/Start';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import { StackRouter } from 'react-navigation';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      lists: [],
    };
  }


  render() {
    return (

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

