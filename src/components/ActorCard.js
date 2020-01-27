import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Close from "@material-ui/icons/Close"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {useHistory} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
    actorCard: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 10,
        width: '50%'
    },
    actorName: {
        marginBottom: 10
    },
    characteristic: {
        display: 'flex',
        alignItems: 'center',
        margin: 15
    },
    characteristicHeader: {
        marginRight: 10,
        fontWeight: 'bold'
    },
    characteristicValue: {
        color: '#828282',
        fontWeight: '400'
    }
});

let foundActor = [];

export const ActorCard = props => {
    const classes = useStyles();
    const [isLoad, setIsLoad] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        (async () => {
            fetch('https://swapi.co/api/people/?search=' + props.match.params.actor_name)
                .then(resp => {
                    return resp.json()
                })
                .then(resp => {
                    foundActor = resp.results;
                    setIsLoad(false);
                })
        })();

        return function cleanup() {
            abortController.abort();
        };
    }, [isLoad, props.match.params.actor_name]);

    const actorCardView = () => {
        return (
            foundActor.map(elem => {
                return (
                    <div key={elem.name} className={classes.actorCard}>
                        <div className={classes.characteristic}>
                            <Typography variant="h3" className={classes.actorName}>{elem.name}</Typography>
                            <IconButton style={{marginLeft: 'auto'}} onClick={() => history.push("/")}>
                                <Close/>
                            </IconButton>
                        </div>
                        <div className={classes.characteristic}>
                            <Typography variant="h5" className={classes.characteristicHeader}>Height </Typography>
                            <Typography variant="h6" className={classes.characteristicValue}>{elem.height}</Typography>
                        </div>
                        <div className={classes.characteristic}>
                            <Typography variant="h5" className={classes.characteristicHeader}>Mass </Typography>
                            <Typography variant="h6" className={classes.characteristicValue}>{elem.mass}</Typography>
                        </div>
                        <div className={classes.characteristic}>
                            <Typography variant="h5" className={classes.characteristicHeader}>Hair color </Typography>
                            <Typography variant="h6" className={classes.characteristicValue}>{elem.hair_color}</Typography>
                        </div>
                        <div className={classes.characteristic}>
                            <Typography variant="h5" className={classes.characteristicHeader}>Skin color </Typography>
                            <Typography variant="h6" className={classes.characteristicValue}>{elem.skin_color}</Typography>
                        </div>
                        <div className={classes.characteristic}>
                            <Typography variant="h5" className={classes.characteristicHeader}>Eye color </Typography>
                            <Typography variant="h6" className={classes.characteristicValue}>{elem.eye_color}</Typography>
                        </div>
                        <div className={classes.characteristic}>
                            <Typography variant="h5" className={classes.characteristicHeader}>Birth year </Typography>
                            <Typography variant="h6"
                                        className={classes.characteristicValue}>{elem.birth_year}</Typography>
                        </div>
                        <div className={classes.characteristic}>
                            <Typography variant="h5" className={classes.characteristicHeader}>Gender</Typography>
                            <Typography variant="h6" className={classes.characteristicValue}>{elem.gender}</Typography>
                        </div>
                        <div className={classes.characteristic}>
                            <Typography variant="h5" className={classes.characteristicHeader}>Skin color</Typography>
                            <Typography variant="h6" className={classes.characteristicValue}>{elem.skin_color}</Typography>
                        </div>
                    </div>
                )
            })
        )
    };

    return (
        <>
            {
                !isLoad ? actorCardView() : (
                    <Loader
                        type="Triangle"
                        color="#fff"
                        height={100}
                        width={100}/>
                )
            }
        </>
    )
};
