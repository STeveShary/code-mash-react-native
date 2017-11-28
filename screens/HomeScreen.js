import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Home'
    };
  
    render() {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text onPress={this._handlePress('Schedule')}>View Schedule!</Text>
        </View>
      )
    }
  
    _handlePress = (screenName) => () => {
      this.props.navigation.navigate(screenName);
    }
  }

  export default HomeScreen;