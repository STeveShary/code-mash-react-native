import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SectionList,
} from 'react-native';
import _ from 'lodash';

import {getMySessions, getSessionStartTimes, getStartDateString} from '../dataService';

class ScheduleScreen extends React.Component {

    constructor(props) {
        super(props);
        this.loadSessions = this.loadSessions.bind(this);
        this._navigateToSession = this._navigateToSession.bind(this);
        this._groupSessions = this._groupSessions.bind(this);
        this.getSessionSchedule = this.getSessionSchedule.bind(this);
    }

    static navigationOptions = {
        title: 'My Schedule'
    };

    state = {loaded: false};

    componentWillMount() {
        this.loadSessions();
    }


    _groupSessions(sessions) {
        _.map(sessions, session =>
            Object.assign(session,
                {
                    formattedStart: getStartDateString(session),
                    key: session.Id
                }));
        const groupStarts = _.groupBy(sessions, (session) => session.formattedStart);
        return _.keys(groupStarts).map((formattedStart) => ({
            title: formattedStart,
            data: groupStarts[formattedStart]
        }));
    }

    _userHasASessionInThisStartTime(sessions, startTime) {
        const selectedStartTimes = sessions.map(session => session.SessionStartTime);
        return _.has(selectedStartTimes, startTime);
    }

    _buildEmptySlot(startTime) {
        return {
            Id: startTime,
            SessionStartTime: startTime,
            placeholder: true,
        }
    }

    getSessionSchedule(selectedSessions) {
        return getSessionStartTimes()
            .then(startTimes => {
                const emptySlots = [];
                startTimes.filter(startTime => !this._userHasASessionInThisStartTime(selectedSessions, startTime))
                    .map(startTime => emptySlots.push(this._buildEmptySlot(startTime)));
                return _.concat(emptySlots, selectedSessions);
            });
    }

    loadSessions() {
        getMySessions().then(selectedSessions => {
            this.getSessionSchedule(selectedSessions)
                .then(schedule => {
                    console.log(schedule, null, 2);
                    this.setState({
                        sessions: this._groupSessions(schedule),
                        loaded: true
                    });
                });
        });
    }

    renderSession(session) {
        if (session.placeholder) {
            return (<Text>No Session selected yet.</Text>);
        } else {
            return (
                <TouchableOpacity key={session.Id} onPress={this._navigateToSession(session.Id)}
                                  style={styles.sessionContainer}>
                    <Text style={styles.sessionTitle}>{session.Title}</Text>
                    <Text
                        style={styles.sessionSpeaker}>{session.Speakers[0].FirstName} {session.Speakers[0].LastName}</Text>
                </TouchableOpacity>);
        }
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