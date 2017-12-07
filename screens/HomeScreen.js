import React from 'react';
import { AppLoading } from 'expo';
import {
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { COLORS } from '../globalStyles';
import { Button } from 'react-native-elements';

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
                    startAsync={downloadDataLocally}
                    onFinish={() => this.setState({ dataLoaded: true })}
                    onError={console.warn}
                />
            )
        }
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Image source={require('../assets/icon.png')}/>
                </View>
                <Button large buttonStyle={styles.navigationButton} onPress={this._handlePress('Schedule')}
                    title="Session Schedule" />
                <Button large buttonStyle={styles.navigationButton} onPress={this._handlePress('MySchedule')}
                        title="My Schedule" />
                <Button large buttonStyle={styles.navigationButton} onPress={this._handlePress('Session',
                    { session: 7113 })}
                    title="View Session!" />
                <Button large buttonStyle={styles.navigationButton} onPress={this._handlePress('Speaker',
                    {
                        speaker: { "Id": "fd245182-1b3b-45ac-93f6-cac098581200", "FirstName": "Priya", "LastName": "Rajagopal", "GravatarUrl": "//www.gravatar.com/avatar/01c9d267e78a30758e8ce4a8735833e5" }
                    })} title="Speakers" />
            </View>
        )
    }

    _handlePress = (screenName, options) => () => {
        this.props.navigation.navigate(screenName, options);
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 20,
        alignItems: 'center',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
   navigationButton: {
       marginTop: 5,
       backgroundColor: COLORS.BLUE,
   }
});
export default HomeScreen;