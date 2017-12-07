import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SectionList,
} from 'react-native';
import { Icon } from 'react-native-elements'
import _ from 'lodash';
import moment from 'moment';

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
                {formattedStart: this._getStartDateString(session),
                key: session.Id}));
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

    renderSession(session) {
        return (
                <TouchableOpacity key={session.Id} onPress={this._navigateToSession(session.Id)}
                                  style={styles.sessionContainer}>
                    {!session.selected && <Icon onPress={this.addSessionToMySchedule(session)} name='heart-outlined' type='entypo' color="#ff0003"/>}
                    {session.selected && <Icon onPress={this.removeSessionFromMySchedule(session)} name='heart' type='entypo' color="#ff0003"/>}
                    <Text style={styles.sessionTitle}>{session.Title}</Text>
                    <Text style={styles.sessionSpeaker}>{session.Speakers[0].FirstName} {session.Speakers[0].LastName}</Text>
                </TouchableOpacity>);
    }

    renderHeader(section) {
        return (
             <Text style={styles.timeSlotHeader}>Timeslot: {section.title}</Text>

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
    timeSlotHeader: {
        fontSize: 20,
        backgroundColor: "#477eff"
    },
    sessionTitle: {
        fontSize: 15,
        fontWeight: "500",
        paddingLeft: 10,
    },
    sessionContainer: {
        paddingTop: 5,
        paddingBottom: 10,
        margin: 3,
        backgroundColor: "#a7b4ff"
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
});

export default ScheduleScreen;