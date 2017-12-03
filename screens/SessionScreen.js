import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { getSession } from '../dataService';

class SessionScreen extends React.Component {

  constructor(props) {
    super(props);
    this.sessionId = props.navigation.state.params.session;
    this.loadSession = this.loadSession.bind(this);
  }

  state = { sessionLoaded: false }

  componentWillMount() {
    this.loadSession(this.sessionId);
  }

  loadSession(sessionId) {
    getSession(sessionId)
      .then(session => {
        this.setState({ session, sessionLoaded: true });
      });
  }

  render() {
    if (this.state.sessionLoaded) {
      console.log(this.state.session, null, 2);
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{this.state.session.Title}</Text>
      <Text style={styles.name}>Presenter(s): {this.state.session.Speakers[0].FirstName} {this.state.session.Speakers[0].LastName}</Text>
          <Text style={styles.room}>Room: {this.state.session.Room}</Text>
          <Text style={styles.abstractTitle}>Summary:</Text>
          <Text style={styles.abstract}>{this.state.session.Abstract}</Text>
        </ScrollView>
      )
    }
    return (<Text></Text>);
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