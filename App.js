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
import MyScheduleScreen from './screens/MyScheduleScreen';
import SpeakerScreen from './screens/SpeakerScreen';

export default StackNavigator({
    Home: {screen: HomeScreen},
    MySchedule: {screen: MyScheduleScreen},
    Schedule: {screen: ScheduleScreen},
    Session: {
        screen: SessionScreen,
        navigationOptions: ({navigation}) => ({
            title: "Session",
        }),
    },
    Speaker: {
        screen: SpeakerScreen,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.speaker.FirstName} ${navigation.state.params.speaker.LastName}`,
        }),
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a84a7',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
