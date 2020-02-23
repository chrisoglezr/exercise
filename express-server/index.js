const express = require('express');
const axios = require('axios')

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/api/people/records/perpage/:perpage/page/:page', (req, res) => {
    const api_url = 'https://api.salesloft.com/v2/people.json';

    let peopleRecords = [];
    let metadata;

    const getPeople = (per_page, page) => {
        try {
            const a = axios.get(`${api_url}?include_paging_counts=true&per_page=${per_page}&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${process.env.API_KEY}`
                }
            });
            a.then(response => {
                response.data.data.forEach(person => {
                    peopleRecords.push({ id: person.id, person_name: person.display_name, email: person.email_address, job_title: person.title });
                });
                metadata = response.data.metadata;
                res.send({ metadata: metadata, people: peopleRecords });
            });
        } catch (error) {
            console.error(error)
        }
    }

    getPeople(req.params.perpage, req.params.page);
});

app.get('/api/people/email/characters/frequency/perpage/:perpage/page/:page', (req, res) => {
    const api_url = 'https://api.salesloft.com/v2/people.json';

    let metadata;
    let frequencyCharacters = new Map();
    let characters = [];

    const getPeople = (per_page, page) => {
        try {
            const a = axios.get(`${api_url}?include_paging_counts=true&per_page=${per_page}&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${process.env.API_KEY}`
                }
            });
            a.then(response => {
                response.data.data.forEach(person => {
                    person.email_address.toLocaleUpperCase().split("").forEach(character => {
                        let actualCharacter = frequencyCharacters.get(character)
                        if (actualCharacter !== undefined) {
                            frequencyCharacters.set(character, actualCharacter + 1);
                        } else {
                            frequencyCharacters.set(character, 1);
                        }
                    });
                });
                frequencyCharacters.forEach((value, key) => characters.push({ character: key, frequency: value }));
                characters.sort((a, b) => b.frequency - a.frequency);
                res.send({ email_characters: characters });
            });
        } catch (error) {
            console.error(error)
        }
    }

    getPeople(req.params.perpage, req.params.page);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));