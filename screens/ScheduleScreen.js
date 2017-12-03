import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { getAllSessions } from '../dataService';

class ScheduleScreen extends React.Component {

  constructor(props) {
    super(props);
    this.loadSessions = this.loadSessions.bind(this);
    this._navigateToSession = this._navigateToSession.bind(this);
  }
  static navigationOptions = {
    title: 'Schedule'
  };

  state = { loaded: false };

  componentWillMount() {
    this.loadSessions();
  }

  loadSessions() {
    getAllSessions().then(sessions => 
      this.setState({ sessions: sessions.map(session => Object.assign(session, {key: session.Id})), loaded: true }));
  }

  render() {
    if (this.state.loaded) {
      const rows = this.state.sessions.map(session => {
        const id = session.Id;
        return (
          <View style={styles.sessionContainer}>
          <Text style={styles.sessionTitle}>{session.Title}</Text>
          </View>);
      });
      return (
        <ScrollView style={styles.container}>
            {rows}
        </ScrollView>
      )
    }
    return (<Text></Text>);
  }

  _navigateToSession = (session) => {
    this.props.navigation.navigate('Session', { session });
  }

  _goBack = () => {
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  sessionTitle: {
    paddingLeft: 10,
    fontWeight: "500",
  },
  sessionContainer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});

export default ScheduleScreen;