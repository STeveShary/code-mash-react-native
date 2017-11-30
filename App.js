import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import SessionScreen from './screens/SessionScreen';
import SpeakerScreen from './screens/SpeakerScreen';

export default StackNavigator({
  Home: { screen: HomeScreen },
  Schedule: { screen: ScheduleScreen },
  Session: { screen: SessionScreen },
  Speaker: { screen: SpeakerScreen },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a84a7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
