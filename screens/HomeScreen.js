import React from 'react';
import { AppLoading } from 'expo';
import {
    Text,
    View,
    StyleSheet,
    Button,
} from 'react-native';

import { downloadDataLocally } from '../dataService';

class HomeScreen extends React.Component {

    state = { dataLoaded: false };

    static navigationOptions = {
        title: 'CodeMash 2018'
    };

    render() {
        if (!this.state.dataLoaded) {
            return (
              <AppLoading
                startAsync={ downloadDataLocally  }
                onFinish={() => this.setState({ dataLoaded: true })}
                onError={console.warn}
              />
            )
        }
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Button onPress={this._handlePress('Session', 
                    { session: 7113})}
                    title="View Session!" />
                <Button onPress={this._handlePress('Speaker',
                    { speaker: '5c2198a7-9081-4686-9a1b-840d758e405e' })} title="Speakers" />
            </View>
        )
    }

    _handlePress = (screenName, options) => () => {
        this.props.navigation.navigate(screenName, options);
    }
}

export default HomeScreen;