import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {getAllPeople} from "../service"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button} from "@material-ui/core";

let characters = []
const useStyles = makeStyles({});

export default function SimpleCompik() {
    const classes = useStyles();
    const [chars, setChar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = React.useState(null);

    const send = () => {
        return fetch('https://swapi.co/api/people/?search=' + value.name)
            .then(resp => {
                let a = resp.json()
                return a
            })
            .then(resp => console.log(resp))

    }


    /*const getAllPeople = () => {
        let people = [];
        return fetch('https://swapi.co/api/people/')
            .then(resp => resp.json())
            .then(resp => {
                people = resp.results
                console.log("people", people);
                return resp.count
            })
            .then(count => {
                const remainingPages = Math.ceil((count - 1) / 10);
                console.log("remainingPages", remainingPages);
                let promises = [];
                for (let i = 2; i <= remainingPages; i++) {
                    promises.push(fetch('https://swapi.co/api/people?page=' + i));
                }
                console.log("people2", people);
                return Promise.all(promises);
            })
            .then(response => {
                //get the rest records - pages 2 through n.
                people = response.reduce((acc, data) => [...acc, ...data.results], people);
                console.log("people2", people);
                return people;
            })
            .catch(error => console.log("Properly handle your exception here", error));
    }*/

    useEffect(() => {

        /*let people =[];
                (async () => {
                    people = await getAllPeople();
                    console.log("starwarsPeople", people);
                })();

                setCharacters(people)

                console.log(characters)*/
        /*getAllPeople().then(resp => {
            if (typeof resp !== "undefined") {
                characters = resp
                console.log(characters)
            }

            //setChar(characters)
        })
                console.log(characters)*/

        (async () => {
            characters = await getAllPeople();
            console.log("starwarsPeople", characters);
            if (characters.length > 0) {
                setIsLoading(false)
            }
        })();


    }, [isLoading]);

    const searcFieldWiew = () => {
        return (
            <>
            <Autocomplete
                id="combo-box-demo"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    console.log(value)
                }}
                options={characters}
                getOptionLabel={option => option.name}
               /* getOptionSelected={option => {
                    setChar(option)
                    console.log(chars)
                }}*/
                style={{width: 300}}
                renderInput={params => (
                    <TextField {...params} variant="outlined" fullWidth/>
                )}
            />
                <Button onClick={send}>ss</Button>
            </>
        )
    };

    return (
        <>
            {
                !isLoading ? searcFieldWiew() : (<h1>loading</h1>)
            }
        </>

    )

}
