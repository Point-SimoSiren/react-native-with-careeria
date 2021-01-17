import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import HelloWorld from './HelloWorld';
import HelloWorldInput from './HelloWorldInput';
import JsonList from './JsonList';
import JsonListPressable from './JsonListPressable';
import YLETekstiTV100 from './YLETekstiTV100';
import YLETekstiTv from './YLETekstiTv';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.upperx}>
          {/* Tuodaan kuva sivulle */}
          <View style={{alignItems: 'center'}}>
              <Image
                  style={styles.logoCareeria}
                  source={{
                    uri: 'https://careeria.fi/Static/careeria/careeria_logo_alpha_230x67_once.gif',
                  }}
              />
          </View>
          <Text>Tämä on minun ensimmäinen React Native -sovellus!</Text>
      </View>
      <View style={styles.centerx}>
          <JsonListPressable />
      </View>
      <View style={styles.lowerx}>
          <YLETekstiTv />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'burlywood',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  upperx: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  centerx: {
    flex: 1,
    width: '100%',
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerx: {
    flex: 4,
    width: '100%',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCareeria: {
    width: 230,
    height: 67,
    margin: 12,
    padding: 10,
  }
});
