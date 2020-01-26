import axios from "axios"
import {observable} from "mobx"

export let searchHistory = observable(JSON.parse(sessionStorage.getItem('historyCharacters')) || []);
export let allCharacters = observable(JSON.parse(sessionStorage.getItem('allCharacters')) || []);

export function getAllPeople() {
    let characters = [];
    return axios('https://swapi.co/api/people/')
        .then(response => {
            characters = response.data.results;
            return response.data.count;
        })
        .then(count => {
            const remainingPages = Math.ceil((count - 1) / 10);
            let promises = [];
            for (let i = 2; i <= remainingPages; i++) {
                promises.push(axios(`https://swapi.co/api/people?page=${i}`));
            }
            return Promise.all(promises);
        })
        .then(response => {
            characters = response.reduce((acc, data) => [...acc, ...data.data.results], characters);
            sessionStorage.setItem('allCharacters', JSON.stringify(characters));
            return characters;
        })
        .catch(error => console.log("Error ", error));
}

export const saveActorData = (Data) => {
    if (searchHistory.map(elem => elem.name !== Data.name)) {
        console.log('data', Data);
        console.log('searchHistory', searchHistory);
        searchHistory.push(Data);
        sessionStorage.setItem('historyCharacters', JSON.stringify(searchHistory));
    }

};
