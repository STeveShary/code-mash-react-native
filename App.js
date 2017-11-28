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

export default StackNavigator({
  Home: { screen: HomeScreen },
  Schedule: { screen: ScheduleScreen },
  Session: { screen: SessionScreen },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a84a7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
