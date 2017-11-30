import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

const speakerInfo = { "Id": "f62ed587-5dab-4818-b0f3-398f7975961a", 
  "FirstName": "Rob", 
  "LastName": "Allen", 
  "Biography": "Rob Allen is a software consultant and developer. He has been involved in software architecture and development for many years and writes code in PHP, Swift and other interesting languages. He is part of Slim Framework's leadership team and contributes to Apache OpenWhisk & other open source projects. Rob is a published author and based in the UK where he runs [Nineteen Feet Limited](http://19ft.com), focussing on API development, training and consultancy. In his spare time, Rob blogs at [akrabat.com](https://akrabat.com) and can often be seen with a camera in his hand.", 
  "GravatarUrl": "//www.gravatar.com/avatar/2f3857ea7ae880357bc66f7314eb5355", 
  "TwitterLink": "https://twitter.com/akrabat", 
  "GitHubLink": "https://github.com/akrabat", 
  "LinkedInProfile": "https://www.linkedin.com/in/akrabat", 
  "BlogUrl": "https://akrabat.com", 
  "SessionIds": ["7466"] 
};


class SessionScreen extends React.Component {
  static navigationOptions = {
    title: 'Speaker'
  };

  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
       <Image
          style={{width: 66, height: 58}}
          source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
        />
        <Text>{speakerInfo.FirstName} {speakerInfo.LastName}</Text>
    { speakerInfo.BlogUrl && <Text>{speakerInfo.BlogUrl}</Text> }
        <Text>{speakerInfo.Biography}</Text>
        <Text onPress={this._handlePress}>Go Home!</Text>
      </View>
    )
  }

  _handlePress = () => {
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a84a7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SessionScreen;