
let speakers;
let sessions;

const speakerPromise = fetch('https://speakers.codemash.org/api/SpeakersData')
    .then(res => res.json())
    .then(json => speakers = json);

// const speakers = await getSpeakerData();
// const sessions = await fetch('https://speakers.codemash.org/api/SessionsData').json();


export const getSession = (id) => {
    return {
        "Id": 7113,
        "SessionTime": "0001-01-01T00:00:00",
        "SessionStartTime": "0001-01-01T00:00:00",
        "SessionEndTime": "0001-01-01T00:00:00",
        "Room": null,
        "Rooms": null,
        "Title": "Devops Zen: Injecting Automated Tests into Infrastructure",
        "Abstract": "Devops zen is to make infrastructure predicable.  At Kroger, we use Nginx as a reverse proxy to route traffic with a configuration that is thousands of lines long with pull requests from dozens of teams. Even with this scale, we are still able to complete on-demand deployments to multiple environments that serve dozens of domains and route to over 50 applications clusters with zero downtime.  We show an open source framework, SnowGlobe, which allows us to simulate and test every possible traffic routing situation before we deploy. We use a full CI/CD pipeline with 7,000+ tests run for every commit. If boring is zen, then our meditation is automated infrastructure testing.",
        "SessionType": "General Session",
        "Tags": ["JavaScript", "Testing", "Java"],
        "Category": "DevOps",
        "Speakers": [{ "Id": "36e05280-a3a9-4435-82f6-50afbed4a388", "FirstName": "Stephen", "LastName": "Shary", "GravatarUrl": "//www.gravatar.com/avatar/3d322357152119a5b27e61db7dd636c0" }]
    }
}

export const getSpeaker = (id) => {
    return {
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
};