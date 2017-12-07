import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SectionList,
} from 'react-native';
import {Icon} from 'react-native-elements'
import _ from 'lodash';
import moment from 'moment';
import {COLORS} from '../globalStyles';

import {getAllSessions, addToMySessions, removeFromMySessions} from '../dataService';

class ScheduleScreen extends React.Component {

    constructor(props) {
        super(props);
        this.loadSessions = this.loadSessions.bind(this);
        this._navigateToSession = this._navigateToSession.bind(this);
        this._getStartDateString = this._getStartDateString.bind(this);
        this._groupSessions = this._groupSessions.bind(this);
        this.addSessionToMySchedule = this.addSessionToMySchedule.bind(this);
        this.removeSessionFromMySchedule = this.removeSessionFromMySchedule.bind(this);
    }

    static navigationOptions = {
        title: 'Schedule'
    };

    state = {loaded: false};

    componentWillMount() {
        this.loadSessions();
    }

    _getStartDateString(session) {
        return moment(session.SessionStartTime)
            .format("ddd h:mm a");

    }

    _groupSessions(sessions) {
        _.map(sessions, session =>
            Object.assign(session,
                {
                    formattedStart: this._getStartDateString(session),
                    key: session.Id
                }));
        const groupStarts = _.groupBy(sessions, (session) => session.formattedStart);
        return _.keys(groupStarts).map((formattedStart) => ({
            title: formattedStart,
            data: groupStarts[formattedStart]
        }));
    }

    loadSessions() {
        getAllSessions().then(sessions =>
            this.setState({
                sessions: this._groupSessions(sessions),
                loaded: true
            }));
    }

    addSessionToMySchedule(session) {
        return () => addToMySessions(session)
            .then(() => this.loadSessions());
    }

    removeSessionFromMySchedule(session) {
        return () => removeFromMySessions(session)
            .then(() => this.loadSessions());
    }

    _getRoomsString(session) {
        if (session.Rooms) {
            return session.Rooms.reduce((cur, newRoom) => cur + ", " + newRoom);
        }
        return "";
    }

    _getSpeakersString(session) {
        if (session.Speakers) {
            return session.Speakers
                .map(speaker => speaker.FirstName + " " + speaker.LastName)
                .reduce((cur, speakerName) =>
                cur + ", " + speakerName);
        }
        return "";
    }

    renderSession(session) {
        return (
            <TouchableOpacity key={session.Id} onPress={this._navigateToSession(session.Id)}
                              style={styles.sessionContainer}>
                <View style={styles.sessionInfo}>
                    <Text style={styles.sessionTitle}>{session.Title}</Text>
                        <Text style={styles.sessionSpeaker}>Presenter(s): {this._getSpeakersString(session)}</Text>
                        <Text style={styles.sessionRoom}>Room(s): {this._getRoomsString(session)}</Text>
                </View>
                <View style={styles.sessionLike}>
                    {!session.selected &&
                    <Icon onPress={this.addSessionToMySchedule(session)} name='heart-outlined' type='entypo'
                          color="#ff0003"/>}
                    {session.selected &&
                    <Icon onPress={this.removeSessionFromMySchedule(session)} name='heart' type='entypo'
                          color="#ff0003"/>}
                </View>
            </TouchableOpacity>);
    }

    renderHeader(section) {
        return (
            <Text style={styles.timeSlotHeader}>{section.title}</Text>

        );
    }

    render() {
        if (this.state.loaded) {
            return ( <SectionList
                renderItem={({item}) => this.renderSession(item)}
                renderSectionHeader={({section}) => this.renderHeader(section)}
                sections={this.state.sessions}
                stickySectionHeadersEnabled="trues"
            />)
        }
        return (<Text></Text>);
    }

    _navigateToSession = (session) => () => {
        this.props.navigation.navigate('Session', {session});
    }
}

const styles = StyleSheet.create({
    sessionSecondLineInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    sessionInfo: {
        flex: 8
    },
    sessionLike: {
        flex: 1,
        padding: 10,
    },
    timeSlotHeader: {
        padding: 10,
        fontSize: 20,
        color: COLORS.WHITE,
        backgroundColor: COLORS.BLUE,
    },
    sessionTitle: {
        fontSize: 17,
        paddingLeft: 10,
    },
    sessionRoom: {
        paddingLeft: 20,
        paddingTop: 2,
        fontSize: 12,
    },
    sessionSpeaker: {
        paddingTop: 10,
        paddingLeft: 20,
        fontSize: 12,
    },
    sessionContainer: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 10,
        margin: 3,
        backgroundColor: COLORS.WHITE,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLORS.ORANGE,
    },
});

export default ScheduleScreen;