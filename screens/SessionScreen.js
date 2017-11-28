import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class SessionScreen extends React.Component {
    static navigationOptions = {
      title: 'Session'
    };
  
    render() {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text>This is where you can view information on a session</Text>
          <Text onPress={this._handlePress}>Go Home!</Text>
        </View>
      )
    }
  
    _handlePress = () => {
      this.props.navigation.goBack();
    }
  }

  export default SessionScreen;