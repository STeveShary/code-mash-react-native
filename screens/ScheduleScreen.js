import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SectionList,
    Header,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import {getAllSessions} from '../dataService';

class ScheduleScreen extends React.Component {

    constructor(props) {
        super(props);
        this.loadSessions = this.loadSessions.bind(this);
        this._navigateToSession = this._navigateToSession.bind(this);
        this._getStartDateString = this._getStartDateString.bind(this);
        this._groupSessions = this._groupSessions.bind(this);
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
        const mappedStartTimes = _.map(sessions, session =>
            Object.assign(session,
                {formattedStart: this._getStartDateString(session)}));
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

    render() {
        if (this.state.loaded) {
            console.log(this.state.sessions[0].data[0]);
            return ( <SectionList
                renderItem={({item}) => <Text>{item.Title}</Text>}
                renderSectionHeader={({section}) => <Text>{section.title}</Text>}
                sections={this.state.sessions}
                stickySectionHeadersEnabled="trues"
            />)
            // const rows = this.state.sessions.map(session => {
            //     return (
            //         <TouchableOpacity key={session.Id} onPress={this._navigateToSession(session.Id)}
            //                           style={styles.sessionContainer}>
            //             <Text style={styles.sessionTitle}>{session.Title}</Text>
            //             <Text>{session.formattedStart}</Text>
            //             <Text style={styles.sessionSpeaker}>{session.Speakers[0].FirstName} {session.Speakers[0].LastName}</Text>
            //         </TouchableOpacity>);
            // });
            // return (
            //     <ScrollView style={styles.container}>
            //         {rows}
            //     </ScrollView>
            // )
        }
        return (<Text></Text>);
    }

    _navigateToSession = (session) => () => {
        this.props.navigation.navigate('Session', {session});
    }
}

const styles = StyleSheet.create({
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