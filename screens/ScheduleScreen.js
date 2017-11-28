import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class ScheduleScreen extends React.Component {
    static navigationOptions = {
      title: 'Schedule'
    };
  
    render() {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text onPress={this._navigateToSession}>Session 1</Text>
          <Text onPress={this._goBack}>Go Home!</Text>
        </View>
      )
    }

    _navigateToSession = () => {
      this.props.navigation.navigate('Session');
    }
  
    _goBack = () => {
      this.props.navigation.goBack();
    }
  }

  export default ScheduleScreen;