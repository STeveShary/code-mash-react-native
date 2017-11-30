import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'CodeMash 2017'
    };
  
    render() {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text onPress={this._handlePress('Schedule')}>View Schedule!</Text>
          <Text onPress={this._handlePress('Speaker')}>Speakers</Text>
        </View>
      )
    }
  
    _handlePress = (screenName) => () => {
      this.props.navigation.navigate(screenName);
    }
  }

  export default HomeScreen;