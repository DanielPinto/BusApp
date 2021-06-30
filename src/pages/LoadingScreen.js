import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

export default function LoadingScreen() {

    const navigation = useNavigation();

  useEffect(
     () => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          navigation.navigate('HOME');
        } else {
          navigation.navigate('Login');
        }
      });
    }
  );

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',}
    });