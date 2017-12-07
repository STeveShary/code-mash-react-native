import {FileSystem} from 'expo';
import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird';

globals = {};

export const getStartDateString = (session) => {
    return moment(session.SessionStartTime)
        .format("ddd h:mm a");
};

export const downloadDataLocally = () => {
    const speakerPromise = FileSystem.downloadAsync(
        'https://speakers.codemash.org/api/SpeakersData',
        FileSystem.documentDirectory + 'speakers.json'
    ).then(() => getAllSpeakers());
    const sessionPromise = FileSystem.downloadAsync(
        'https://speakers.codemash.org/api/SessionsData',
        FileSystem.documentDirectory + 'sessions.json'
    ).then(() => getAllSessions());
    const mySessionsPromise = getMySessions();
    return Promise.all([speakerPromise, sessionPromise, mySessionsPromise]);
};

export const getSessionStartTimes = () =>
    getAllSessions().then(sessions => {
        return _.uniq(sessions.map(session => session.SessionStartTime));
    });

const markSelectedSessions = (allSessions) => {
    return getMySessions().then(mySessions => {
        mySessions.forEach(mySession => {
            let matchingSession = allSessions.find(session => mySession.Id === session.Id);
            if (matchingSession) {
                matchingSession.selected = true;
            }
        });
        return allSessions;
    });
};

export const getAllSessions = () => {
    if (globals.allSessions) {
        let allSessions = JSON.parse(JSON.stringify(globals.allSessions));
        allSessions.forEach(session => session.selected = false)
        return markSelectedSessions(allSessions);
    }
    return FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'sessions.json')
        .then(sessionsString => {
            let allSessions = JSON.parse(sessionsString);
            globals.allSessions = allSessions;
            return markSelectedSessions(allSessions);
        });
};

export const getMySessions = () => {
    if(globals.mySessions) {
        console.log("Getting my sessions: ", globals.mySessions.map(session => session.Id), null, 2);
        return Promise.resolve(globals.mySessions);
    }
    return FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'mySessions.json')
        .then(sessionsString => {
            let mySessions = JSON.parse(sessionsString);
            globals.mySessions = mySessions;
            return mySessions
        })
        .catch(err => []);
};

export const addToMySessions = (session) => {
    return getMySessions().then(sessions => {
        console.log("Adding session: ", session.Id);
        sessions.push(session);
        return _storeMySessions(sessions);
    });
};

export const removeFromMySessions = (sessionToRemove) =>
    getMySessions().then(sessions => {
        console.log("Removing session: ", sessionToRemove.Id);
        _.remove(sessions, session => session.Id === sessionToRemove.Id);
        return _storeMySessions(sessions);
    });

const _storeMySessions = (sessions) => {
    globals.mySessions = sessions;
    FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'mySessions.json', JSON.stringify(sessions));
};

export const getSession = (id) =>
    getAllSessions()
        .then(sessions => {
            const matchingSessions = sessions.filter(session => session.Id === id);
            return (matchingSessions && matchingSessions.length > 0)
                ? matchingSessions[0]
                : {};
        });

export const getAllSpeakers = () => {
    if (global.allSpeakers) {
        return Promise.resolve(global.allSpeakers);
    }
    return FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'speakers.json')
        .then(speakersString => {
            let allSpeakers = JSON.parse(speakersString);
            globals.allSpeakers = allSpeakers;
            return allSpeakers;
        })
        .catch(err => []);
}

export const getSpeaker = (id) =>
    getAllSpeakers()
        .then(speakers => {
            return speakers.find(speaker => speaker.Id === id);
        });