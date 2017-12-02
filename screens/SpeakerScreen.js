import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Linking,
  ScrollView,
} from 'react-native';

import {getSpeaker} from '../dataService';

const speakerInfo = {
  "Id": "f62ed587-5dab-4818-b0f3-398f7975961a",
  "FirstName": "Christopher",
  "LastName": "Allen Alleshouse",
  "Biography": "Rob Allen is a software consultant and developer. He has been involved in software architecture and development for many years and writes code in PHP, Swift and other interesting languages. He is part of Slim Framework's leadership team and contributes to Apache OpenWhisk & other open source projects. Rob is a published author and based in the UK where he runs [Nineteen Feet Limited](http://19ft.com), focussing on API development, training and consultancy. In his spare time, Rob blogs at [akrabat.com](https://akrabat.com) and can often be seen with a camera in his hand.",
  "GravatarUrl": "//www.gravatar.com/avatar/2f3857ea7ae880357bc66f7314eb5355",
  "TwitterLink": "https://twitter.com/akrabat",
  "GitHubLink": "https://github.com/akrabat",
  "LinkedInProfile": "https://www.linkedin.com/in/akrabat",
  "BlogUrl": "https://akrabat.com",
  "SessionIds": ["7466"]
};


class SessionScreen extends React.Component {

  constructor(props) {
    super(props);
    this.speaker = props.navigation.state.params.speaker;
    this._openBlog = this._openBlog.bind(this);
    this._openGithub = this._openGithub.bind(this);
    this._openLinkedIn = this._openLinkedIn.bind(this);
    this._openTwitter = this._openTwitter.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    return {
      title: '',
    };
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Image style={styles.bioImage}
            source={{ uri: "https:" + this.speaker.GravatarUrl }} />
          <View style={styles.nameContainer}>
           {this.speaker.BlogUrl && <Text style={styles.link} onPress={this._openBlog}>Blog</Text>}
           {this.speaker.LinkedInProfile && <Text style={styles.link} onPress={this._openLinkedIn}>LinkedIn</Text>}
           {this.speaker.TwitterLink && <Text style={styles.link} onPress={this._openTwitter}>Twitter</Text>}
           {this.speaker.GitHubLink && <Text style={styles.link} onPress={this._openGithub}>GitHub</Text>}
          </View>
        </View>
        <Text style={styles.bioContainer}>{this.speaker.Biography}</Text>
        <View style={styles.sessionContainer}>
          <Text style={styles.sessionTitle}>Sessions</Text>
          <Text>Sessions to come!</Text>
        </View>
      </ScrollView>
    )
  }

  _openBlog = () => {
      Linking.openURL(this.speaker.BlogUrl);
  }

  _openLinkedIn = () => {
    Linking.openURL(this.speaker.LinkedInProfile)
  }

  _openTwitter = () => {
    Linking.openURL(this.speaker.TwitterLink)
  }

  _openGithub = () => {
    Linking.openURL(this.speaker.GitHubLink)
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