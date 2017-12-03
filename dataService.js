import { FileSystem } from 'expo';
let speakers;
let sessions;

const speakerPromise = fetch('https://speakers.codemash.org/api/SpeakersData')
    .then(res => res.json())
    .then(json => speakers = json);

export const downloadDataLocally = () => {
    const speakerPromise = FileSystem.downloadAsync(
        'https://speakers.codemash.org/api/SpeakersData',
        FileSystem.documentDirectory + 'speakers.json'
    );
    const sessionPromise = FileSystem.downloadAsync(
        'https://speakers.codemash.org/api/SessionsData',
        FileSystem.documentDirectory + 'sessions.json'
    );
    return Promise.all([speakerPromise, sessionPromise]);
}

export const getAllSessions = () =>
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'sessions.json')
        .then(sessionsString => JSON.parse(sessionsString));

export const getSession = (id) =>
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'sessions.json')
        .then(sessionsString => {
            const sessions = JSON.parse(sessionsString);
            const matchingSessions = sessions.filter(session => session.Id === id);
            return (matchingSessions && matchingSessions.length > 0)
                ? matchingSessions[0]
                : {};
        });

export const getSpeaker = (id) =>
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'speakers.json')
        .then(speakersString => {
            return speakers.find(speaker => speaker.Id === id);
        });