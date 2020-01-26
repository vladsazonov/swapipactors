import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    foundCharacterCard: {
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 10,
        padding: 5,
        cursor: 'pointer'
    },

});


export const CharacterHistoryCard = (props) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.foundCharacterCard} onClick={props.findCharacterFromHistory(props.name)}>
                <Typography variant="h6">{props.name}</Typography>
            </div>
        </>
    )
}
