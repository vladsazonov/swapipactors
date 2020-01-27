import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {getAllPeople, saveCharacterData, searchHistory, allCharacters} from "../service"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useHistory} from "react-router-dom";
import Logo from "../images/logo.svg"
import Search from "@material-ui/icons/Search"
import IconButton from '@material-ui/core/IconButton';
import {CharacterHistoryCard} from "./CharacterHistoryCard"
import {observer} from "mobx-react-lite";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    searchFieldArea: {
        width: '60%',
        marginTop: 60,
    },
    searchField: {
        color: '#fff',
        backgroundColor: '#fff',
        borderRadius: 5,
        '& label.Mui-focused': {
            color: '#feea06',
            fontSize: '2rem',
            display: 'none'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#feea06',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#feea06',
                display: 'none'
            },
        }
    },
    logoImage: {
        width: '50px'
    },
    sendButton: {
        color: '#feea06',
        padding: 5
    },
    searchHistoryArea: {
        width: '60%',
        marginTop: 30,
        display: 'flex',
        flexWrap: 'wrap'
    },
    header: {
        color: '#fff',
    }
});

let characters = [];

export const SearchField = observer(() => {
    const history = useHistory();
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = React.useState(null);

    const findCharacter = () => {
        saveCharacterData(value);
        history.push("/actor/" + value.name);
    };

    const findCharacterFromHistory = Name => event => {
        return fetch('https://swapi.co/api/people/?search=' + Name)
            .then(resp => {
                return resp.json();
            })
            .then(resp => {
                return resp.results
            })
            .then(() => {
                history.push("/actor/" + Name)
            })
    };

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        if (allCharacters.length === 0) {
            (async () => {
                characters = await getAllPeople();
                if (characters.length > 0) {
                    setIsLoading(false);
                }
            })();
        } else {
            characters = allCharacters;
            setIsLoading(false);
        }
        return function cleanup() {
            abortController.abort();
        };
    }, [isLoading]);

    const searchFieldView = () => {
        return (
            <>
                <img style={{width: '40%'}} src={Logo} alt="logo"/>
                <Autocomplete
                    className={classes.searchFieldArea}
                    id="combo-box-demo"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    options={characters}
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                        <TextField {...params}
                                   classes={{root: classes.searchField}}
                                   variant="outlined"
                                   label="Search your actor"
                                   fullWidth
                                   InputProps={{
                                       ...params.InputProps,
                                       endAdornment: (
                                           <React.Fragment>
                                               <IconButton disabled={value == null} className={classes.sendButton}
                                                           onClick={findCharacter}><Search/></IconButton>
                                               {params.InputProps.endAdornment}
                                           </React.Fragment>
                                       ),
                                   }}
                        />
                    )}
                />
                <div className={classes.searchHistoryArea}>
                    <Typography variant='caption' className={classes.header}>History</Typography>
                    {
                        searchHistory.map(elem => {
                            return (
                                <CharacterHistoryCard key={elem.name} name={elem.name}
                                                      findCharacterFromHistory={findCharacterFromHistory}/>
                            )
                        })
                    }
                </div>
            </>
        )
    };

    return (
        <>
            {
                !isLoading ? (searchFieldView()) : (
                    <Loader
                        type="Triangle"
                        color="#fff"
                        height={100}
                        width={100}/>
                )
            }
        </>
    )
});
