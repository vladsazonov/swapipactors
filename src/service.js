import axios from "axios"

export let searchHistory = JSON.parse(sessionStorage.getItem('historyCharacters')) || [];
export let allCharacters = JSON.parse(sessionStorage.getItem('allCharacters')) || [];

export function getAllPeople() {
    let characters = [];
    return axios('https://swapi.co/api/people/')
        .then(resp => {
            characters = resp.data.results;
            return resp.data.count;
        })
        .then(count => {
            const remainingPages = Math.ceil((count - 1) / 10);
            let promises = [];
            for (let i = 2; i <= remainingPages; i++) {
                promises.push(axios(`https://swapi.co/api/people?page=${i}`));
            }
            return Promise.all(promises);
        })
        .then(resp => {
            sessionStorage.setItem('allCharacters', JSON.stringify(resp.reduce((acc, data) => [...acc, ...data.data.results], characters)));
            return allCharacters = JSON.parse(sessionStorage.getItem('allCharacters'));
        })
        .catch(error => console.log("Error ", error));
}

export const saveCharacterData = (characterData) => {
    let sameCharacter = searchHistory.find(elem => elem.name === characterData.name);
    if (!sameCharacter) {
        searchHistory.push(characterData);
        sessionStorage.setItem('historyCharacters', JSON.stringify(searchHistory));
    }
};
