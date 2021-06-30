import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import * as firebase from 'firebase';
import apiKeys from './src/config/firebase';

import MainStack from './src/navigator/MainStack';

export default function App() {

  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
  
  return (

    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
    
  );
}