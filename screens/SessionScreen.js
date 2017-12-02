import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

class SessionScreen extends React.Component {

    constructor(props) {
      super(props);
      this.session = props.navigation.state.params.session;
    }
  
    render() {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{this.session.Title}</Text>
          <Text style={styles.name}>{this.session.Speakers[0].FirstName} {this.session.Speakers[0].LastName}</Text>
          <Text style={styles.room}>Room: {this.session.Room}</Text>
          <Text style={styles.abstractTitle}>Summary:</Text>
          <Text style={styles.abstract}>{this.session.Abstract}</Text>
        </ScrollView>
      )
    }
  
    _handlePress = () => {
      this.props.navigation.goBack();
    }
  }


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});

  export default SessionScreen;