import React, {useEffect} from 'react';
import './App.css';
import {SearchField} from "./components/SearchField";
import {ActorCard} from "./components/ActorCard";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function ScreenSwitcher() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <SearchField/>
                </Route>
                <Route path="/actor/:actor_name"
                       render={(routeProps) =>
                           <ActorCard {...routeProps}/>}
                />
            </Switch>
        </div>
    )
}

function App() {
    useEffect(() => {
        if (sessionStorage.historyCharacters === undefined) {
            sessionStorage.setItem('historyCharacters', '[]');
            if (sessionStorage.allCharacters === undefined) {
                sessionStorage.setItem('allCharacters', '[]');
            }
        }
    });

    return (
        <Router>
            <ScreenSwitcher/>
        </Router>
    );
}

export default App;
