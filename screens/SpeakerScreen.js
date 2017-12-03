import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Linking,
  ScrollView,
} from 'react-native';

import { getSpeaker } from '../dataService';

class SessionScreen extends React.Component {

  constructor(props) {
    super(props);
    this.speakerId = props.navigation.state.params.speaker.Id;
    this._openBlog = this._openBlog.bind(this);
    this._openGithub = this._openGithub.bind(this);
    this._openLinkedIn = this._openLinkedIn.bind(this);
    this._openTwitter = this._openTwitter.bind(this);
  }

  state = { loaded: false };

  componentWillMount() {
    this.loadSpeaker(this.speakerId);
  }

  loadSpeaker(speakerId) {
    getSpeaker(speakerId)
      .then(speaker => this.setState({ speaker, loaded: true }));
  }

  render() {
    if (this.state.loaded) {
      console.log(this.state.speaker, null, 2);
      return (
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <Image style={styles.bioImage}
              source={{ uri: "https:" + this.state.speaker.GravatarUrl }} />
            <View style={styles.nameContainer}>
              {!!this.state.speaker.BlogUrl && <Text style={styles.link} onPress={this._openBlog}>Blog</Text>}
              {!!this.state.speaker.LinkedInProfile && <Text style={styles.link} onPress={this._openLinkedIn}>LinkedIn</Text>}
              {!!this.state.speaker.TwitterLink && <Text style={styles.link} onPress={this._openTwitter}>Twitter</Text>}
              {!!this.state.speaker.GitHubLink && <Text style={styles.link} onPress={this._openGithub}>GitHub</Text>}
            </View>
          </View>
          <Text style={styles.bioContainer}>{this.state.speaker.Biography}</Text>
          <View style={styles.sessionContainer}>
            <Text style={styles.sessionTitle}>Sessions</Text>
            <Text>Sessions to come!</Text>
          </View>
        </ScrollView>
      )
    }
    return (<Text></Text>);
  }

  _openBlog = () => {
    Linking.openURL(this.state.speaker.BlogUrl);
  }

  _openLinkedIn = () => {
    Linking.openURL(this.state.speaker.LinkedInProfile)
  }

  _openTwitter = () => {
    Linking.openURL(this.state.speaker.TwitterLink)
  }

  _openGithub = () => {
    Linking.openURL(this.state.speaker.GitHubLink)
  }

  _handlePress = () => {
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  sessionContainer: {
    flex: 1,
    padding: 20,
  },
  sessionTitle: {
    fontWeight: "500",
    fontSize: 30,
    backgroundColor: "blue",
    color: "white",
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  link: {
    color: 'blue',
    paddingTop: 10,
    fontSize: 20,
  },
  speakerName: {
    fontSize: 15,
    fontWeight: "700",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    height: 200,
    paddingLeft: 15,
    paddingTop: 15,
  },
  nameContainer: {
    flex: 0.4,
    flexDirection: "column",
    paddingLeft: 10,
  },
  bioImage: {
    flex: 0.5,
    alignSelf: 'stretch',
    width: 200,
    height: 200,
    padding: 10,
  },
  bioContainer: {
    flex: 1,
    padding: 20,
    fontSize: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});

export default SessionScreen;