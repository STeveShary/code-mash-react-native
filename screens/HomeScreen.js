import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
} from 'react-native';

import { getSpeaker, getSession } from '../dataService';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'CodeMash 2018'
    };

    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Button onPress={this._handlePress('Session', 
                    { session: getSession(7113)})}
                    title="View Session!" />
                <Button onPress={this._handlePress('Speaker',
                    { speaker: getSpeaker('f62ed587-5dab-4818-b0f3-398f7975961a') })} title="Speakers" />
            </View>
        )
    }

    _handlePress = (screenName, options) => () => {
        this.props.navigation.navigate(screenName, options);
    }
}

export default HomeScreen;